# from flask import Flask, request, jsonify
# from flask_cors import CORS
import json
import sys
from pystac_client import Client
from planetary_computer import sign
import rioxarray
import math


STAC_API_URL = "https://planetarycomputer.microsoft.com/api/stac/v1"
COLLECTION_ID = "nasa-nex-gddp-cmip6"
BBOX = [-82.644739, 37.201483, -77.719519, 40.638801]  # Bounding box for West Virginia
"""BBOX = [-85.0, 35.0, -75.0, 42.0]  # Bounding box for West Virginia and surrounding area"""
"""BBOX = [-125.0, 24.396308, -66.93457, 49.384358]  # Approximate bounding box for the contiguous USA"""
"""BBOX = [-125.0, 47.0, -123.0, 49.0] # NW tip of continental US"""
MAX_POINTS = 50000

def celsius_to_fahrenheit(celsius):
    return (celsius * 9 / 5) + 32

def get_tavg_data(da, x, y):
    try:
        # Assuming the tavg value is in the first band (update if necessary)
        tavg_value = da.isel(band=0, x=x, y=y).values.item()
        return celsius_to_fahrenheit(tavg_value) if not math.isnan(tavg_value) else None
    except IndexError:
        return None



def get_temperature_data(date):
    
    print("Initializing STAC client...", file=sys.stderr)  # Log to stderr
    client = Client.open(STAC_API_URL)

    print(f"Searching for data in collection '{COLLECTION_ID}' for date {date} within BBOX {BBOX}...", file=sys.stderr)
    search = client.search(
        collections=[COLLECTION_ID],
        bbox = BBOX,
        datetime=f"{date}T00:00:00Z/{date}T23:59:59Z",
        limit=5
    )

    items = list(search.items())
    if not items:
        print(f"Nothing there bro", file=sys.stderr)
        return []

    item = items[0]
    asset_key = list(item.assets.keys())[1]
    signed_href = sign(item.assets[asset_key].href)

    da = rioxarray.open_rasterio(signed_href)
    print("Dataset loaded. Processing grid data...", file=sys.stderr)

    data_output = []
    total_points = da.sizes['x'] * da.sizes['y']
    print(f"Total grid points to process: {total_points} (only processing the first {MAX_POINTS} for testing)", file=sys.stderr)

    count = 0
    for i in range(da.sizes['x']):
        if i % 10 == 0:
            print(f"Processing column {i + 1} of {da.sizes['x']}...", file=sys.stderr)
        for j in range(da.sizes['y']):
            lon, lat = da['x'][i].item(), da['y'][j].item()

            if not (BBOX[0] <= lon <= BBOX[2] and BBOX[1] <= lat <= BBOX[3]):
                continue

            tavg_value = get_tavg_data(da, i, j)
            if tavg_value is None:
                continue

            data_output.append({
                "latitude": lat,
                "longitude": lon,
                "tavg": tavg_value
            })
            
            count += 1
            if count >= MAX_POINTS:
                print(f"Reached limit of {MAX_POINTS} locations. Stopping.", file=sys.stderr)
                return data_output

    print("Finished processing all grid points.", file=sys.stderr)
    return data_output

def main(date):

    print(f"Starting data retrieval for date: {date}", file=sys.stderr)
    data = get_temperature_data(date)
    print(json.dumps(data))

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python grab.py <date>", file=sys.stderr)
        sys.exit(1)
    
    input_date = sys.argv[1]
    main(input_date)





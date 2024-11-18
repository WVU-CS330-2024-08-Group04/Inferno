import leafmap
import os

os.environ["TITILER_ENDPOINT"] = "planetary-computer"

url = "https://planetarycomputer.microsoft.com/api/stac/v1"
collection = "noaa-nclimgrid-monthly"
time_range = "2020-12-01/2020-12-31"
bbox = [-122.2751, 47.5469, -121.9613, 47.7458]

search = leafmap.stac_search(
    url=url,
    max_items=10,
    collections=[collection],
    bbox=bbox,
    datetime=time_range,
    get_info=True,
)

item = list(search.keys())[0]

###########################################################################
# THIS IS THE AREA I MODIFIED

assets = list(leafmap.stac_assets(collection=collection, item=item, titiler_endpoint="pc"))

m = leafmap.Map()

for asset in assets:
    m.add_stac_layer(
        collection=collection,
        item=item,
        assets=[asset], 
        name=asset + " Color infrared",
    )
###########################################################################

m.to_html("planetary_computer_NClimGrid.html", title="Awesome 3D Map", width="100%", height="500px")
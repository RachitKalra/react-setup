#!/bin/bash
# build the docker image and build the node project

echo "Enter Prefix for image"
read -r pre

# package.json package version
package_verion="x.x"

image_name="react-starter-$pre-$(date +%Y-%m-%d)"



echo "Building image  $image_name/$package_verion"

sudo docker build  -t "rachit_r2d2/$image_name:$package_verion"  .
#!/bin/sh
wget -c https://github.com/ledccn/beikeyun/archive/master.zip -O beikeyun.zip
unzip -o ./beikeyun.zip -d /usr
cp -rf /usr/beikeyun-master/* /usr/local/apps/dashboard
cp /usr/local/apps/dashboard/n1/aria2.html /usr/local/apps/dashboard/theme/darkmatter/templates/appcfg/aria2.html
cp /usr/local/apps/dashboard/n1/other-docker.html /usr/local/apps/dashboard/theme/darkmatter/templates/appcfg/other-docker.html
/etc/init.d/S99dashboard restart
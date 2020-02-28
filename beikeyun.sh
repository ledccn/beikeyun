#!/bin/sh
wget -c https://github.com/ledccn/beikeyun/archive/master.zip -O beikeyun.zip
unzip -o ./beikeyun.zip -d /usr
cp -rf /usr/beikeyun-master/* /usr/local/apps/dashboard
/etc/init.d/S99dashboard restart

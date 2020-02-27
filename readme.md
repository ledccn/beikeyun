# 小钢炮适用版本：

- phicomm-n1 20190411-2042
- beikeyun 20190506-0242 freq-limited
- beikeyun 20190506-0242

请认真核对版本，然后继续！
======================================
## 命令安装方法：

```bash
# 下载汉化包
wget -c https://github.com/ledccn/beikeyun/archive/master.zip -O beikeyun.zip
# 解压并安装
unzip -o ./beikeyun.zip -d /usr
cp -rf /usr/beikeyun-master/* /usr/local/apps/dashboard
# 重启管理面板
/etc/init.d/S99dashboard restart

# 如果你的小钢炮是N1，再多执行2条命令：
cp /usr/local/apps/dashboard/n1/aria2.html /usr/local/apps/dashboard/theme/darkmatter/templates/appcfg/aria2.html

cp /usr/local/apps/dashboard/n1/other-docker.html /usr/local/apps/dashboard/theme/darkmatter/templates/appcfg/other-docker.html

/etc/init.d/S99dashboard restart
```
======================================
## 手动安装方法：
1、用scp或其他方法把，解压好的theme移到/usr/local/apps/dashboard/中

2、重启dashboard
`/etc/init.d/S99dashboard restart`

======================================

不断更新：https://www.iyuu.cn/archives/10/

来自：367013672@qq.com


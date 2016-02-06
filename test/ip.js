/**
 * Created by google on 2/5/16.
 */

'use strict';
const os=require('os');
const network=os.networkInterfaces();

const platform =os.platform();
let ip=null;
switch (platform){
    case 'linux':
        for(var key in network){
            if(key=='eth0'&&ip==null){
                network[key].forEach((v)=>{
                    if(v.family!='IPv6'){
                       ip=v.address;
                    }
                })
            }else if(key=='wlan0'&&ip==null){
                network[key].forEach((v)=>{
                    if(v.family!='IPv6'){
                        ip=v.address;
                    }
                })
            }
        }
        break;
    case 'win32':
        network['本地连接'].map((v,k)=>{
            v.forEach((val,key)=>{
                if(val['internal']==false&&val['family']=='IPv4'){
                    ip=val.address;
                }
            })
        });
        break;
}

console.log(ip);




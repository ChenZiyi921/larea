>npm 账号注册  
>npm 邮箱验证  

>创建包文件  
```js, package.json, readme.md```

```
    npm login
    npm publish
```
>检查仓库是否被设成了淘宝镜像库  
```npm config get registry```  

>如是，则设回原仓库  
```npm config set registry = http://registry.npmjs.org```  

>如发布成功，则再次将仓库地址设为淘宝镜像地址  
```npm config set registry=https://registry.npm.taobao.org/```  
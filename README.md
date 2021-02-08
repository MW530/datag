# datag

datag is a Vue plugin can gather enviroment and user movement information.

## install

Using npm

```shell
$ npm install datag
```

Using yarn

```shell
$ yarn add datag
```

Using jsDelivr CDN:

```
<script src="https://cdn.jsdelivr.net/npm/datag@0.0.1/index.min.js"></script>
```

Using unpkg CDN:

```
<script src="https://unpkg.com/datag@0.0.1/index.js"></script>
```

## Using

First: install datag 

Second: import datag and register on vue like this.

```javascript
import datag from 'datag'

Vue.use(datag)
```

Third: register the command `v-listen` to the item you`d like to monitor.

```vue
<Item
v-listen:[parantType] = "[subType]"
>
</Item>
```



## Description

datag registered a `vue` command named `v-listen`,and it is use on the item you`d like to monitor.

and you are suppose to pass the parentType to the arg of the command(`v-listen:[parentType]`),and pass the subType to the value of the command(`v-listen:[parentType] = [subType]`).



## API

### environment information 

enviData(Type)

```javascript
//script in xxx.vue

//baseData
let baseData = this.$datag.enviData() 
/*baseData type can be ignored
*let baseData = this.$datag.enviData(0)
*/

//advancedData
this.$datag.enviData(1).then((advancedData) => {
    //use advancedData here
    ...
})

//mixData
this.$datag.enviData(2).then((mixData) => {
    //use mixData here
    ...
})
```



#### introduce

you can get the information even you don`t register the v-command.And there are three kinds of information.

1. base data: It includes some base information:
   1. `engine`: the engien of the browser.
   2. `browser`: the browser type.
   3. `device`: the device brand and type(special for Mobile platform).
   4. `os`:  Operation system .
   5. `lang`: the language.
   6. `onLine`: the online status.
   7. `date`: the timeStamp of gather time.
2. advanced data: It include some advanced feature of the client device.includes:
   1. `bluetooth`: the ability for bluetooth.
   2. `position`: the position(permission are required).
   3. `isTouch`: the ability of touch screen.
   4. `screenHeight`: the screen hight.
   5. `screenWidth`: the screen width.
   6. `colorDepth`: the color depth of the screen.
   7. `screenType`: the screen type.
3. mix data: includes all the information mentioned above.

**note:** 

1. type 1 will return a `object` includes its content.

2. type 2 and type 3 will return a `promise` includes the information.



### click data

clickData()

```javascript
//script in xxx.vue

let clickData = this.$datag.clickData()
```

#### introduce

datag is going to gather the click data of the items been monitored by putting the `v-listen` command on.

It return a object contains two part:

1. byTime: gather click data by every time the user clicks.And it contains following data:

   1. `eventType`: click type such as "mousedown"
   2. `isTrusted`: whether it is created by JavaScript.
   3. `mainType`: mainType passed by command.
   4. `srcNode`: the trigger HTML node.
   5. `subType`: subType passed by command.
   6. `timeStamp`: click timeStamp
   7. `x`: left screen margin of click position 
   8. `y`: top screen margin of click position

2. byType: an object contains parent type  and it`s sub type click times such as :

   ```javascript
   china : {
       south: 2,
       north: 3,
       west: 4
   }
   ```

### scroll data

the main function of `datag`,`datag`  divide the visible screen into two part :`inportant`, ` unimportance`.And `datag` will calculate the time it remains in the `important` part. And `datag` will processing the data on an appropriate time. And the data processed will stored in the `scrollData`.

you can get the data by this:

```javascript
//script in xxx.vue

let scrollData = this.$datag.scrollData
```

Besides,you can get the row data of scroll data by this:

```javascript
//script in xxx.vue

let scrollData = this.$datag.watchData()
```

It will return the row data of scroll includes:

	1. `timeGap`: the time gap user watched this time.
 	2. `vatalType`: the sub types remain in the visible part.



## License

[MIT](https://github.com/axios/axios/blob/master/LICENSE)


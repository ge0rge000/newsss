import React, { Component } from 'react';
import {
  Text,
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,Button
  ,ActivityIndicator,
  TouchableOpacity
} from 'react-native';

export default class News extends Component{
constructor(props){
  super(props);
  this.state={
    isloading :true,

    articles:[],
    
  }
}




 

componentDidMount(){
  
  fetch('http://newsapi.org/v2/everything?q=apple&from=2020-04-19&to=2020-04-19&sortBy=popularity&apiKey=1b7fb42012d54ae2949b0ca17b967a87')
  .then((responce)=>{
return responce .json();
  }
  )
    .then((data)=>{
      this.setState({
        articles:data.articles,
        isloading:false

      })
    })
    .catch((error)=>{
      console.log(error)

    })
    

}

_renderItem=({item,index})=>{
  return(
    <TouchableOpacity onPress={()=>alert (item.url)}>
    <View style={styles.item}>
      <Image source={{uri:item.urlToImage}} 
      style={{justifyContent: 'center',
      alignItems: 'center', width:400,height:200,}}/>
      <Text style={{fontSize:20,fontWeight: 'bold',}}>{item.title}></Text>
      <Text>{item.content} </Text>
      <Button title='like' color='#102027'/>
      <Button title='dislike' color='#102027'/>
      

   
    </View>
    </TouchableOpacity>
    
  )
}

render(){
let {container} = styles
let {articles,isloading}=this.state
if(isloading){
  return(
  <View style={styles.container}>
<ActivityIndicator size="large" animating/>
  </View>
  )
}
else{
return(
<View>

<FlatList
  data={articles}
  renderItem={this._renderItem}
keyExtractor={(item,index)=>index.toString ()}
  />
 
</View>

)

}


}
}

const styles=StyleSheet.create({
container:{
flex:1,
justifyContent:'center',
alignItems:'center',
padding:10,
paddingTop:50
},
item:{
 padding:10,
 borderBottomColor:'black',
 borderBottomWidth:5
}



})



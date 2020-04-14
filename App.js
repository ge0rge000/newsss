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








export default class App extends Component{
constructor(props){
  super(props);
  this.state={
    isloading :true,

    articles:[],
    
  }
}




 

componentDidMount(){
  
  fetch('http://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=1b7fb42012d54ae2949b0ca17b967a87')
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
      style={{width:200,height:200}}/>
      <Text>{item.title} </Text>
      <Button title='like'/>
      <Button title='dislike'/>
      

   
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



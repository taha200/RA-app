
import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Image,
  TextInput,AsyncStorage
} from 'react-native';
import {

  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import firebase from 'react-native-firebase'
import {Button,Text,ButtonGroup,Header,Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';




class EditProf extends React.Component{
 constructor(props){
   super(props);
   this.state={
     name:'',
    firebaseUID:'',
    email:'',
    password:'',
    profilePicUrl:'',
    fbProLink:'',
    InstaProLink:'',
    whatsappNo:'',
    avatarSource:'',
    showImage:false,
    val:''
   }
   this.updateIndex = this.updateIndex.bind(this)
    
  }
  componentDidMount(){
    AsyncStorage.getItem('uid').then((value)=>{
      var dataref=firebase.database().ref().child(value)
      dataref.on('value',(snapshot)=>{
        var acd= snapshot.val()
        this.setState({
          name:acd.name,
          email:acd.email,
          password:acd.password,
          InstaProLink:acd.InstaProLink,
          fbProLink:acd.fbProLink,
          whatsappNo:acd.whatsappNo,
          profilePicUrl:acd.profilePicUrl,
          val:value
        })
      })
    })
  }
  updateIndex (selectedIndex) {
    this.setState({
      selectedIndex:selectedIndex
    })
   if(selectedIndex===1){
     this.setState({
       userType:true
     })
    }
     else{
      this.setState({
        userType:false
      })
     }
   
    this.setState({userType:selectedIndex})
  }
userCreation=(data)=>{
 console.log(this.state.val)
   firebase.database().ref().child(this.state.val).set(data)
}
onEditProf=()=>{
 
   this.userCreation({
     name:this.state.name,
     email:this.state.email,
     password:this.state.password,
     profilePicUrl:this.state.profilePicUrl,
    InstaProLink:this.state.InstaProLink,
    fbProLink:this.state.fbProLink,
    whatsappNo:this.state.whatsappNo
   })
   this.setState({
    email:'',
    password:'',
    InstaProLink:'',
    fbProLink:'',
    whatsappNo:'',
    profilePicUrl:'',
    avatarSource:'',
    showImage:false
  
  })
}


ChooseImage = ()=>{
  const options = {
    quality: 1.0,
    maxWidth: 800,
    maxHeight: 500,
    storageOptions: {
      skipBackup: true,
    },
  };
  ImagePicker.showImagePicker(options,(response) => {
 
      var storageRef = firebase.storage().ref();

    // setTimeout(this.getItemLocally,5000)
    // Create a reference to 'images/mountains.jpg'


     
       
  
  
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    } else {
       this.setState({
         profilePicUrl:response.uri
       })
      var file=response.path.toString()
      var reftosave = storageRef.child('Ridaappuserprofile/'+this.state.email+'.jpg');
      reftosave.putFile(file).then((snapshot)=> {
         this.setState({
           profilePicUrl:snapshot.downloadURL
         })
              // localStorage.setItem('URL',url)
         }).catch(function(error) {
console.log(error)
        });
  
  
      // You can also display the image using data:
      // const source = { uri: 'data:image/jpeg;base64,' + response.data };
  
    }
  
}
  )}

  render(){
    return (
      <View style={styles.Container}>
    
      
      <View style={{width:'90%',borderRadius:10}}>
          
          
      <TextInput placeholder="Enter Name..." style={{borderBottomWidth:1,marginBottom:15,height:50}} value={this.state.name} onChangeText={(value)=>this.setState({name:value})}/>
     <TextInput placeholder="Enter Email..." style={{borderBottomWidth:1,marginBottom:15,height:50}} value={this.state.email} onChangeText={(value)=>this.setState({email:value})}/>
      <TextInput placeholder="Enter Password..." style={{borderBottomWidth:1,marginBottom:15,height:50}} value={this.state.password} onChangeText={(value)=>this.setState({password:value})}/>
      <TextInput placeholder="Enter Insta Profile Link..." style={{borderBottomWidth:1,marginBottom:15,height:50}} value={this.state.InstaProLink} onChangeText={(value)=>this.setState({InstaProLink:value})}/>
      <TextInput placeholder="Enter Fb Profile Link ..." style={{borderBottomWidth:1,marginBottom:15,height:50}} value={this.state.fbProLink} onChangeText={(value)=>this.setState({fbProLink:value})}/>
      <TextInput placeholder="Whatsapp EditProfed No...." style={{borderBottomWidth:1,marginBottom:15,height:50}} value={this.state.whatsappNo} onChangeText={(value)=>this.setState({whatsappNo:value})}/>


      <Button title="Choose Profile Picture Again" onPress={this.ChooseImage} buttonStyle={{backgroundColor:"#65779F",width:'50%',alignSelf:'flex-start',marginTop:5}} />
 <Image source={{uri:this.state.profilePicUrl}} style={{width:80,height:50,marginTop:5,borderRadius:8}}/>

      <Button title="Update" onPress={this.onEditProf}  buttonStyle={{backgroundColor:"#65779F",width:100,alignSelf:'flex-end',marginTop:15}} />

    </View>
    
        
       
      </View>
    );
}
};

const styles = StyleSheet.create({
Container: {
flex:1,
justifyContent:'center',
alignItems:'center'
},
});

export default EditProf;
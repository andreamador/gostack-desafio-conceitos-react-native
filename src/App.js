import React,{useState, useEffect} from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";


import api from './services/api'

export default function App() {

  
  const [ repositorys , setRepositorys] = useState([]);

  useEffect(() => {
    api.get('repositories').then( response => setRepositorys(response.data) );
  },[]);


  async function handleLikeRepository(id) {

    response = await api.post(`/repositories/${id}/like`);

    const repositoryIndex = repositorys.findIndex( repository  =>  repository.id == id  );

    repositorys[repositoryIndex].likes += 1;

    setRepositorys([...repositorys])

  }

  function renderRepository ( {item : repository} ) {

    return (
      <View style={styles.repositoryContainer}>
      
        <Text style={styles.repository}>{repository.title}</Text> 

        <View style={styles.techsContainer}>
          {repository.techs.map((tech)=>(
            <Text style={styles.tech} key={tech} > {tech} </Text>
          ))}
        </View>

        <View style={styles.likesContainer}>
          <Text 
            style={styles.likeText}
            testID={`repository-likes-${repository.id}`}
          >
            {`${repository.likes}  curtida`}{ repository.likes >= 0 ? 's' : '' }
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLikeRepository(repository.id)}
          testID={`like-button-${repository.id}`}
        >
          <Text style={styles.buttonText}>Curtir</Text>
        </TouchableOpacity>   

      </View> )
    
  }


  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
   
        <FlatList
          data={repositorys}
          keyExtractor={ repository => repository.id}
          renderItem={ (item) => renderRepository(item) }
        />

      </SafeAreaView>
    </>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});

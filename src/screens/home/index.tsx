import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from 'react-native';
import styles from './styles';

import { Participant } from '../../components/Participant';
import { useState } from 'react';

export default function Home() {
    const [participants, setParticipants] = useState<string[]>([])
    const [participantName, setParticipantName] = useState("")

    function handleParticipantAdd() {
        if(participantName.length === 0) {
            return Alert.alert("Incluir participante", "O nome do participante não pode estar vazio!")
        }
        if(participants.includes(participantName)) {
            return Alert.alert("Incluir participante", "Já existe um participante com este nome!")
        }
        setParticipants(prevState => [...prevState, participantName])
        setParticipantName('')
    }

    function handleParticipantRemove(name: string) {
        Alert.alert("Remover", "Deseja remover o participante?", 
            [
                {
                    text: "sim",
                    onPress: () => setParticipants(prevState => prevState.filter(participant => participant !== name))
                }, 
                {
                    text: "não"
                }
            ]
        )
    }

    return (
        <View style={styles.container}>
            <Text style={styles.eventName}>Nome do Evento</Text>
            <Text style={styles.eventDate}>Terça, 15 de Outubro de 2024</Text>
            <View style={styles.form}>
                <TextInput 
                    style={styles.input} 
                    placeholder='Nome do participante' 
                    placeholderTextColor="#6B6B6B" 
                    value={participantName}
                    onChangeText={text => setParticipantName(text)}
                />
                <TouchableOpacity style={styles.button} onPress={handleParticipantAdd}>
                    <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
            </View>

            <FlatList 
                data={participants}
                keyExtractor={item => item}
                renderItem={({item}) => (
                    <Participant
                        key={item}
                        name={item} 
                        onRemove={() => handleParticipantRemove(item)} 
                    />
                )}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>Adicione participantes a sua lista de presença </Text>
                )}
            />
        </View>
    );
}
import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

interface CardProps {
  icon: any;
  title: string;
}

export default function Card({ icon, title }: CardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View>{icon}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    margin: 5
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})

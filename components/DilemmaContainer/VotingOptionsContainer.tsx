import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const VotingOptionsContainer = () => {
  return (
    <View style={styles.buttonRow}>
      <TouchableOpacity style={[styles.voteBtn, styles.yes]} onPress={() => {}}>
        <Text style={styles.voteText}>Yes</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.voteBtn, styles.no]} onPress={() => {}}>
        <Text style={styles.voteText}>No</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 8,
  },
  voteBtn: {
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    backgroundColor: '#b39ddb',
  },
  yes: { backgroundColor: '#b39ddb' },
  no: { backgroundColor: '#ce93d8' },
  voteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 19,
  },
});

export default VotingOptionsContainer;

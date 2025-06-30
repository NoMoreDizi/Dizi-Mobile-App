import React, { ReactNode } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useSuspenseQuery, gql } from '@apollo/client';

const DILEMMA_QUERY = gql`
  query GetDilemma($id: ID!) {
    dilemma(id: $id) {
      id
      question
      postedAt
      voteCount
      imageUrl
      comments
    }
  }
`;

interface Dilemma {
  id: string;
  question: string;
  postedAt: string;
  voteCount: number;
  imageUrl?: string;
  comments: string[];
}

interface DilemmaData {
  dilemma: Dilemma;
}

interface DilemmaContainerProps {
  dilemmaId: string;
  children?: ReactNode;
}

const formatTimeSince = (postedAt: string): string => {
  const now = new Date();
  const postedDate = new Date(postedAt);
  const diffInSeconds = Math.floor((now.getTime() - postedDate.getTime()) / 1000);

  if (diffInSeconds < 60) return `${diffInSeconds} second${diffInSeconds === 1 ? '' : 's'} ago`;
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minute${Math.floor(diffInSeconds / 60) === 1 ? '' : 's'} ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hour${Math.floor(diffInSeconds / 3600) === 1 ? '' : 's'} ago`;
  return `${Math.floor(diffInSeconds / 86400)} day${Math.floor(diffInSeconds / 86400) === 1 ? '' : 's'} ago`;
};

const { width } = Dimensions.get('window');
const CARD_WIDTH = Math.min(width, 430);

const DilemmaContainer: React.FC<DilemmaContainerProps> = ({ dilemmaId, children }) => {
  const { data, error } = useSuspenseQuery<DilemmaData>(DILEMMA_QUERY, {
    variables: { id: dilemmaId },
    errorPolicy: 'all',
  });

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Error loading dilemma:</Text>
        <Text style={styles.errorDetail}>{error.message}</Text>
      </View>
    );
  }

  if (!data) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (!data.dilemma) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>No dilemma found with ID: {dilemmaId}</Text>
      </View>
    );
  }

  const { question, postedAt, voteCount, imageUrl, comments } = data.dilemma;
  const timeSincePosted = formatTimeSince(postedAt);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.card}>
        <View style={styles.skipRow}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>
        {imageUrl === "Switzerland" ? (
         <Image source={require('../../assets/images/Dilemma/Switzerland.jpg')} style=
         {styles.image} />
         ) : imageUrl ? (<Image source={{ uri: imageUrl }} style={styles.image} />
         ) : null}

        <Text style={styles.question}>{question}</Text>
        {children}
        <TouchableOpacity style={styles.sendBtn} onPress={() => {}}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
        <Text style={styles.metaText}>
          Posted {timeSincePosted} • {voteCount} vote{voteCount !== 1 ? 's' : ''}
        </Text>
        <Text style={styles.commentsLabel}>Comments</Text>
        <View style={styles.commentsBox}>
          {comments && comments.length > 0 ? (
            comments.map((c, i) => (
              <View key={i} style={styles.commentRow}>
                <Text style={styles.commentIcon}>👤</Text>
                <Text style={styles.commentText}>{c}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noComments}>No comments yet.</Text>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F6F6FC',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 0,
    
  },
  card: {
    flex: 1,
    width: '100%',
    borderWidth: 2,
    borderColor: '#a259ff',
    maxWidth: 430,
    backgroundColor: '#fff',
    borderRadius: 0,
    marginTop: 0,
    marginBottom: 0,
    alignItems: 'center',
    shadowColor: '#a259ff',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 18,
    elevation: 8,
    overflow: 'hidden',
    paddingHorizontal: 18,
    paddingTop: 0,
    paddingBottom: 0,
  },
  skipRow: {
    width: '100%',
    alignItems: 'center',
    marginTop: 14,
    marginBottom: 14,
  },
  skipText: {
    color: '#a259ff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 22,
    backgroundColor: '#eee',
    borderWidth: 5,
    borderColor: '#a259ff',
  },
  question: {
    backgroundColor: '#a259ff',
    color: '#fff',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 10,
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    width: '100%',
  },
  sendBtn: {
    marginTop: 16,
    marginBottom: 10,
    alignSelf: 'center',
    backgroundColor: '#a259ff',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 36,
    shadowColor: '#a259ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  metaText: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
    marginBottom: 10,
    alignSelf: 'center',
  },
  commentsLabel: {
    alignSelf: 'flex-start',
    color: '#a259ff',
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 5,
    fontSize: 15,
  },
  commentsBox: {
    width: '100%',
    alignItems: 'flex-start',
    paddingBottom: 16,
  },
  commentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  commentIcon: { marginRight: 6, fontSize: 15 },
  commentText: { fontSize: 14, color: '#333' },
  noComments: { color: '#aaa', fontStyle: 'italic', fontSize: 13 },
  loader: {
    marginVertical: 24,
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#FFF0F0',
    borderRadius: 8,
    margin: 16,
    borderWidth: 1,
    borderColor: '#FFD6D6',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  errorDetail: {
    color: '#D32F2F',
    fontSize: 14,
    opacity: 0.8,
  },
});

export default DilemmaContainer;

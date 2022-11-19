import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from "../screens/HomeWNav"
import TopTracks from "../screens/TopTracks"
import TopArtists from "../screens/TopArtists"
import RecentlyPlayed from "../screens/RecentlyPlayed"

const Stack = createNativeStackNavigator();

export default function HomeStack(route) {
    const { accessToken } = route.params;
  return (
    <Stack.Navigator >
      <Stack.Screen name="home" component={Home} initialParams={{accessToken: accessToken}} options={{ headerShown: false }} />
      <Stack.Screen name="topTracks" component={TopTracks} initialParams={{accessToken: accessToken}} options={{ headerShown: false }}  />
      <Stack.Screen name="topArtists" component={TopArtists} initialParams={{accessToken: accessToken}} options={{ headerShown: false }}  />
      <Stack.Screen name="recentlyPlayed" component={RecentlyPlayed} initialParams={{accessToken: accessToken}} options={{ headerShown: false }}  />
    </Stack.Navigator>
  )
}
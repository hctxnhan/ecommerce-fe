import { ScrollView, View, YStack } from 'tamagui';
import { SearchBar } from '../../components/SearchBar';
import { Section } from '../../components/Section';
import { Tabs } from 'expo-router';

export default function Home() {
  return (
    <View padding={'$4'} flex={1}>
      <SearchBar />
      <ScrollView
        marginTop="$6"
        space="$8"
        showsVerticalScrollIndicator={false}
      >
        <Section
          title="Popular"
          seeMore="See All"
          description="See what is trending products"
        />
        <Section
          title="Popular"
          seeMore="See All"
          description="See what is trending products"
        />
        <Section
          title="Popular"
          seeMore="See All"
          description="See what is trending products"
        />
      </ScrollView>

      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home'
          }}
        />
      </Tabs>
    </View>
  );
}

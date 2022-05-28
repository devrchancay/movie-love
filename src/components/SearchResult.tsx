import { useRef } from "react";
import { useWindowDimensions } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useInfiniteQuery } from "react-query";

import Box from "./Box";
import Item from "./Item";
import ItemSkeleton from "./ItemSkeleton";
import Text from "./Text";

const fetchMovies = async ({ pageParam = 1 }) => {
  const request = await fetch(
    `http://www.omdbapi.com/?apikey=5eec5adc&s=love&y=2020&page=${pageParam}`
  );

  if (request.status !== 200) {
    throw new Error("Error fetching movies");
  }
  const response = await request.json();
  const movies = response?.Search ?? [];
  const totalPages = Math.round(response?.totalResults / 10);
  const nextPage = pageParam >= totalPages ? null : pageParam + 1;
  return { movies, nextPage, totalPages };
};

function SearchResult() {
  const { height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  const flatListRef = useRef<FlatList<any>>(null);

  const { data, fetchNextPage, hasNextPage, isFetched } = useInfiniteQuery(
    "movies",
    fetchMovies,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );
  const lastRecord = data?.pages?.[data.pages.length - 1] ?? {
    nextPage: 1,
    totalPages: 1,
  };
  const { nextPage, totalPages } = lastRecord;

  const currentPage = nextPage ? nextPage - 1 : totalPages;

  const movies = data?.pages?.map(({ movies }) => movies)?.flat() ?? [];
  const filterMovies = movies.filter(
    (movie, index) =>
      movies.findIndex((m) => m.imdbID === movie.imdbID) === index
  );

  const flatListHeight = height - bottom - 100;

  if (!isFetched) {
    return null;
  }

  return (
    <Box px={2}>
      <Box py={4} flexDirection="row" justifyContent="space-between">
        <Text variant="bold" fontSize={3}>
          Resultados: {filterMovies.length}
        </Text>
        <Text>
          Página {currentPage} de {totalPages}
        </Text>
      </Box>
      <FlatList
        data={filterMovies}
        ref={flatListRef}
        contentContainerStyle={{
          flexGrow: 1,
        }}
        style={{
          height: flatListHeight,
        }}
        ItemSeparatorComponent={() => (
          <Box borderBottomWidth={1} my={4} borderColor="lightGray" />
        )}
        keyExtractor={(item) => item.imdbID}
        renderItem={({ item }: { item: any }) => <Item item={item} />}
        showsVerticalScrollIndicator={false}
        onEndReached={() => {
          if (hasNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (hasNextPage) {
            return (
              <Box px={1}>
                {Array.from({ length: 2 })
                  .fill(0)
                  .map((_, index) => (
                    <ItemSkeleton key={index} />
                  ))}
              </Box>
            );
          }
          if (!hasNextPage) {
            return (
              <Box py={5}>
                <Text textAlign="center" color="darkText">
                  No hay más películas
                </Text>
              </Box>
            );
          }
          return null;
        }}
      />
    </Box>
  );
}

export default SearchResult;

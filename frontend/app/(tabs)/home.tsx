import React from "react";
import { Pressable, ScrollView } from "react-native";
import { Text, Card, Button } from "react-native-paper";
import apiClient from "@/src/services/axiosService";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FontAwesome } from "@expo/vector-icons";
import { MonoText } from "@/components/StyledText";
import Container from "@/components/custom/Layout/Container";
import { relativeTime } from "@/src/utils/date";
import ProtectedRoute from "@/components/ProtectedRoute";
import { Counter, DetailResponse } from "@/src/types";
import { useTheme } from "@/src/theming/ThemeProvider";

export default function HomeScreen() {
  const { theme } = useTheme();

  const queryClient = useQueryClient();

  const {
    data: counters,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["counters"],
    queryFn: async () => {
      const response =
        await apiClient.get<DetailResponse<Counter[]>>("/api/counters/");
      return response.data.data;
    },
  });

  const updateValueMutation = useMutation({
    mutationFn: async ({
      id,
      increment,
    }: {
      id: number;
      increment: boolean;
    }) => {
      await apiClient.post(
        `/api/counters/${id}/${increment ? "increment" : "decrement"}/`,
      );
    },
    onMutate: async ({ id, increment }) => {
      await queryClient.cancelQueries(["counters"]);

      const previousCounters = queryClient.getQueryData<Counter[]>([
        "counters",
      ]);

      queryClient.setQueryData(["counters"], (old?: Counter[]) => {
        if (!old) return [];
        return old.map((counter) =>
          counter.id === id
            ? {
                ...counter,
                reset_value: increment
                  ? counter.reset_value + 1
                  : counter.reset_value - 1,
              }
            : counter,
        );
      });

      return { previousCounters };
    },
    onError: (_err, _variables, context) => {
      queryClient.setQueryData(["counters"], context?.previousCounters);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["counters"]);
    },
  });

  if (isLoading) return <Text>Loading counters...</Text>;
  if (isError) return <Text>Failed to load counters.</Text>;

  return (
    <ProtectedRoute>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {counters && counters.length > 0 ? (
          counters.map((counter) => (
            <Card key={counter.id} style={{ marginBottom: 16 }}>
              <Card.Content>
                <Container flex col>
                  <Container flex col>
                    <Text style={{ fontSize: 18, fontWeight: "700" }}>
                      {counter.name}
                    </Text>
                    <Text style={{ fontSize: 14, color: theme.colors.dimmed }}>
                      {relativeTime(counter.created_at)}
                    </Text>
                  </Container>
                  <Container
                    flex
                    row
                    style={{
                      justifyContent: "space-evenly",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      onPress={() =>
                        updateValueMutation.mutate({
                          id: counter.id,
                          increment: false,
                        })
                      }
                      style={{
                        width: "33%",
                        height: 50,
                      }}
                    >
                      <FontAwesome name="minus" size={24} />
                    </Button>
                    <MonoText style={{ fontSize: 24 }}>
                      {counter.reset_value}
                    </MonoText>
                    <Button
                      onPress={() =>
                        updateValueMutation.mutate({
                          id: counter.id,
                          increment: true,
                        })
                      }
                      style={{
                        width: "33%",
                        height: 50,
                      }}
                    >
                      <FontAwesome name="plus" size={24} />
                    </Button>
                  </Container>
                </Container>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text>No counters available.</Text>
        )}
      </ScrollView>
    </ProtectedRoute>
  );
}

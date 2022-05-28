import { useEffect } from "react";
import { useRef } from "react";
import { Animated } from "react-native";
import Box from "./Box";

const BoxAnimated = Animated.createAnimatedComponent(Box);

function ItemSkeleton() {
  const opacity = useRef(new Animated.Value(0.5)).current;

  const animate = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    animate();
  }, []);

  return (
    <Box
      py={2}
      borderTopWidth={1}
      borderColor="lightGray"
      height={140}
      my={3}
      flexDirection="row"
    >
      <Box width={120}>
        <BoxAnimated
          style={{ opacity }}
          width={105}
          height={140}
          bg="lightGray"
          borderRadius={6}
        />
      </Box>
      <Box justifyContent="space-between">
        <Box>
          <BoxAnimated
            style={{ opacity }}
            width={130}
            height={10}
            bg="lightGray"
            mt={3}
          />
          <BoxAnimated
            style={{ opacity }}
            width={40}
            height={10}
            bg="lightGray"
            mt={3}
          />
        </Box>
        <Box height={50} justifyContent="flex-end">
          <BoxAnimated
            style={{ opacity }}
            width={80}
            height={30}
            borderRadius={6}
            bg="lightGray"
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ItemSkeleton;

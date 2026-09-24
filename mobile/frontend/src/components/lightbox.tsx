import { Image } from "expo-image";
import { useEffect, useRef } from "react";
import { Modal, Pressable, ScrollView, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { IconClose } from "@/src/components/icons";

/** Full-screen photo viewer, swipe between photos. */
export function Lightbox({ images, index, onClose }: { images: string[]; index: number | null; onClose: () => void }) {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scroll = useRef<ScrollView>(null);

  useEffect(() => {
    if (index != null) setTimeout(() => scroll.current?.scrollTo({ x: index * width, animated: false }), 0);
  }, [index, width]);

  return (
    <Modal visible={index != null} transparent animationType="fade" onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.96)" }} testID="lightbox">
        <ScrollView ref={scroll} horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {images.map((uri, i) => (
            <Pressable key={i} onPress={onClose} style={{ width, height, justifyContent: "center" }}>
              <Image source={{ uri }} style={{ width, height: height * 0.8 }} contentFit="contain" />
            </Pressable>
          ))}
        </ScrollView>
        <Pressable
          onPress={onClose}
          testID="lightbox-close"
          style={{ position: "absolute", top: insets.top + 12, right: 16, width: 42, height: 42, borderRadius: 999, backgroundColor: "rgba(255,255,255,0.12)", alignItems: "center", justifyContent: "center" }}
        >
          <IconClose color="#FFFFFF" size={20} />
        </Pressable>
      </View>
    </Modal>
  );
}

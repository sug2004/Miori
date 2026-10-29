import type { ComponentType } from 'react';
import { Text, View, ViewStyle } from 'react-native';

const TINT = '#E3C6A6';
const L = { borderWidth: 1.6, borderColor: TINT };

export function TShirtIcon() {
  return (
    <View style={{ width: 26, height: 20, alignItems: 'center', justifyContent: 'center' }}>
      {/* sleeves */}
      <View style={[{ position: 'absolute', top: 1, left: 2, width: 7, height: 9, borderRadius: 2, transform: [{ rotate: '35deg' }] }, L]} />
      <View style={[{ position: 'absolute', top: 1, right: 2, width: 7, height: 9, borderRadius: 2, transform: [{ rotate: '-35deg' }] }, L]} />
      {/* body */}
      <View style={[{ width: 12, height: 17, borderRadius: 3, marginTop: 2 }, L]} />
    </View>
  );
}

export function ClosetIcon() {
  return (
    <View style={[{ width: 24, height: 20, borderRadius: 3, alignItems: 'center', justifyContent: 'center' }, L]}>
      <View style={{ position: 'absolute', top: 2, bottom: 2, width: 1.4, backgroundColor: TINT }} />
      <View style={{ position: 'absolute', left: 4, width: 2, height: 5, borderRadius: 2, backgroundColor: TINT }} />
      <View style={{ position: 'absolute', right: 4, width: 2, height: 5, borderRadius: 2, backgroundColor: TINT }} />
    </View>
  );
}

export function CameraIcon() {
  return (
    <View style={[{ width: 24, height: 18, borderRadius: 4, alignItems: 'center', justifyContent: 'center' }, L]}>
      <View style={[{ width: 9, height: 9, borderRadius: 5 }, L]} />
      <View style={{ position: 'absolute', top: -2, left: 4, width: 6, height: 3, borderRadius: 1, backgroundColor: TINT }} />
    </View>
  );
}

export function SparkIcon() {
  return (
    <Text style={{ fontSize: 20, lineHeight: 24, color: TINT }}>✦</Text>
  );
}

export function ChatIcon() {
  return (
    <View style={[{ width: 22, height: 18, borderRadius: 6, borderTopLeftRadius: 12, alignItems: 'flex-start', justifyContent: 'center' }, L]}>
      <View style={{ marginLeft: 6, marginTop: 4, width: 12, height: 1.4, backgroundColor: TINT }} />
      <View style={{ marginLeft: 6, marginTop: 2, width: 8, height: 1.4, backgroundColor: TINT }} />
    </View>
  );
}

export function HangerIcon() {
  return (
    <View style={{ width: 24, height: 18, alignItems: 'center' }}>
      <View style={{ position: 'absolute', top: 0, width: 6, height: 6, borderColor: TINT, borderWidth: 1.6, borderRadius: 3 }} />
      <View style={{ position: 'absolute', top: 5, left: 12, width: 1.6, height: 3, backgroundColor: TINT }} />
      <View style={{ position: 'absolute', top: 6, left: 1.5, width: 21, height: 1.6, backgroundColor: TINT }} />
      <View style={{ position: 'absolute', bottom: 0, left: 4, width: 16, height: 1.6, borderRadius: 1, backgroundColor: TINT }} />
    </View>
  );
}

export function BellIcon() {
  return (
    <View style={{ width: 18, height: 20, alignItems: 'center' }}>
      <View
        style={{
          width: 14,
          height: 13,
          borderColor: TINT,
          borderWidth: 1.6,
          borderBottomWidth: 0,
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
          marginTop: 2,
        }}
      />
      <View style={{ width: 16, height: 1.6, backgroundColor: TINT, marginTop: 0 }} />
      <View style={{ width: 6, height: 1.6, backgroundColor: TINT, borderRadius: 1, marginTop: 2 }} />
    </View>
  );
}

export function HeartIcon() {
  return <Text style={{ fontSize: 18, lineHeight: 24, color: TINT }}>♡</Text>;
}

export function TrendIcon() {
  return (
    <View style={{ height: 18, flexDirection: 'row', alignItems: 'flex-end', gap: 3 }}>
      {[
        { h: 8 },
        { h: 12 },
        { h: 16 },
      ].map((b, i) => (
        <View key={i} style={{ width: 3, height: b.h, borderRadius: 1.5, backgroundColor: TINT, opacity: 0.9 }} />
      ))}
    </View>
  );
}

export function CircleHangerIcon({ size = 56 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.4,
        borderColor: TINT,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <HangerIcon />
    </View>
  );
}

export function CircleHeartIcon({ size = 56 }: { size?: number }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        borderWidth: 1.4,
        borderColor: TINT,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <HeartIcon />
    </View>
  );
}

export function BookmarkIcon({ filled = false, color = '#E3C6A6' }: { filled?: boolean; color?: string }) {
  return (
    <View style={{ width: 14, height: 18 }}>
      <View
        style={{
          width: 14,
          height: 18,
          borderWidth: 1.6,
          borderColor: color,
          borderTopLeftRadius: 3,
          borderTopRightRadius: 3,
          backgroundColor: filled ? color : 'transparent',
        }}
      />
      {!filled ? (
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 5,
            width: 0,
            height: 0,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderBottomWidth: 4,
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: '#0D0E0C',
          }}
        />
      ) : null}
    </View>
  );
}

export function BulbIcon() {
  const k = TINT;
  return (
    <View style={{ width: 22, height: 24, alignItems: 'center' }}>
      <View style={{ width: 14, height: 14, borderRadius: 7, borderWidth: 1.6, borderColor: k }} />
      <View style={{ width: 10, height: 1.6, backgroundColor: k, borderRadius: 1, marginTop: 2 }} />
      <View style={{ width: 6, height: 1.6, backgroundColor: k, borderRadius: 1, marginTop: 2 }} />
    </View>
  );
}

export function SearchIcon({ color = TINT }: { color?: string }) {
  return (
    <View style={{ width: 18, height: 18, alignItems: 'center' }}>
      <View style={{ width: 12, height: 12, borderWidth: 1.6, borderColor: color, borderRadius: 6 }} />
      <View
        style={{
          position: 'absolute',
          bottom: 1,
          right: 1,
          width: 7,
          height: 1.6,
          borderRadius: 1,
          backgroundColor: color,
          transform: [{ rotate: '45deg' }],
        }}
      />
    </View>
  );
}

export function GalleryIcon() {
  return (
    <View style={[{ width: 24, height: 18, borderRadius: 3, alignItems: 'flex-start', justifyContent: 'flex-end', padding: 2 }, L]}>
      <View style={{ position: 'absolute', top: 2, left: 2, width: 4, height: 4, borderRadius: 2, backgroundColor: TINT, opacity: 0.8 }} />
      <View style={{ width: 8, height: 8, borderColor: TINT, borderWidth: 1.6, borderRightColor: 'transparent', borderBottomColor: 'transparent', borderTopLeftRadius: 6, transform: [{ rotate: '0deg' }], marginBottom: 1 }} />
      <View style={{ position: 'absolute', bottom: 2, right: 2, width: 10, height: 6, borderRadius: 2, backgroundColor: TINT, opacity: 0.6 }} />
    </View>
  );
}

export function PencilIcon() {
  return (
    <View style={{ width: 22, height: 22, alignItems: 'flex-start' }}>
      <View style={{ width: 12, height: 16, borderWidth: 1.6, borderColor: TINT, borderTopLeftRadius: 2, borderTopRightRadius: 2, transform: [{ rotate: '-45deg' }], marginLeft: 5, marginTop: 2 }} />
      <View style={{ position: 'absolute', bottom: 1, left: 7, width: 2, height: 3, backgroundColor: TINT, borderRadius: 1 }} />
    </View>
  );
}

export function ShopIcon() {
  return (
    <View style={[{ width: 20, height: 18, borderRadius: 3, borderTopLeftRadius: 6, borderTopRightRadius: 6, alignItems: 'center', justifyContent: 'flex-end' }, L]}>
      <View style={{ position: 'absolute', top: 1, width: 8, height: 8, borderColor: TINT, borderWidth: 1.6, borderBottomWidth: 0, borderTopLeftRadius: 6, borderTopRightRadius: 6 }} />
    </View>
  );
}

const MAP: Record<string, ComponentType> = {
  outfit: TShirtIcon,
  wardrobe: ClosetIcon,
  camera: CameraIcon,
  inspire: SparkIcon,
  saved: HeartIcon,
  chat: ChatIcon,
  shop: ShopIcon,
};

export function ActionIcon({ name, size = 56 }: { name: string; size?: number }) {
  const Icon = MAP[name] ?? SparkIcon;
  const style: ViewStyle = {
    width: size,
    height: size,
    borderRadius: size / 2,
    borderWidth: 1,
    borderColor: '#34302A',
    backgroundColor: '#1E1C18',
    alignItems: 'center',
    justifyContent: 'center',
  };
  return (
    <View style={style}>
      <View style={{ opacity: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Icon />
      </View>
    </View>
  );
}

import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "../../components/Button";
import '../../global.css';


export default function ThirdScreen() {
  return (
    <View className="flex-1 items-center justify-center">
     
      <Text>Third screen</Text>
      <Link href="/admin/nested" push asChild>
        <Button title="Go to nested screen" />
      </Link>

      <Link href="/admin/also-nested" push asChild>
        <Button title="Go to also-nested screen" />
      </Link>

    </View>
  );
}

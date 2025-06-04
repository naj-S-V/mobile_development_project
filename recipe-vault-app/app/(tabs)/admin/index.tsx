import { Link } from "expo-router";
import { Text, View } from "react-native";
import { Button } from "../../../components/Button";


export default function ThirdScreen() {
  return (
    <View className="flex-1 items-center justify-center">
     
      <Text className="text-4xl font-bold text-blue-500 mb-4">
        Admin menu
      </Text>
      <Link href="/admin/add-user" push asChild>
        <Button title="Add user" />
      </Link>

      <Link href="/admin/remove-user" push asChild>
        <Button title="Remove user" />
      </Link>

    </View>
  );
}

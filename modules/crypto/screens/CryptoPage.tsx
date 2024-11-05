import React, { useEffect } from "react";
import { View, Text } from "react-native"

const CryptoPage = () => {

  useEffect(() => {
    const foo = async () => {
      const res = await fetch("/api/listings");
      const data = await res.json();

      console.log('foo data', data);
    }
    foo();
  }, [])


  return (
    <View>
      <Text>
        Teste
      </Text>
    </View>
  )
}

export default CryptoPage;
// app/login.tsx
import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    SafeAreaView,
    StatusBar,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithCredential,
    GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
    const { validateAuthForm } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
    const [loading, setLoading] = useState(false);

  

    const validate = () => {
        const formErrors = validateAuthForm({ email, password });
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleLogin = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email.trim(), password);
        } catch (e: any) {
            Alert.alert("Gabim në login", e.message || "Kontrollo email/password.");
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async () => {
        if (!validate()) return;
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email.trim(), password);
            Alert.alert("Sukses", "Llogaria u krijua me sukses!");
        } catch (e: any) {
            Alert.alert("Gabim në regjistrim", e.message || "Diçka shkoi keq.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.root}>
            <StatusBar barStyle="light-content" />
            <View style={styles.center}>
                <Text style={styles.title}>SPY</Text>
                <Text style={styles.subtitle}>Kyçu ose krijo llogari për të vazhduar</Text>

                <View style={styles.form}>
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        placeholderTextColor="#9E9E9E"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                    {errors.email && <Text style={styles.error}>{errors.email}</Text>}

                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        placeholderTextColor="#9E9E9E"
                        secureTextEntry
                        value={password}
                        onChangeText={setPassword}
                    />
                    {errors.password && <Text style={styles.error}>{errors.password}</Text>}

                    <TouchableOpacity style={[styles.btn, styles.primary]} onPress={handleLogin} disabled={loading}>
                        <Text style={styles.btnText}>{loading ? "Duke hyrë..." : "LOGIN"}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.btn}
                        onPress={handleRegister}
                        disabled={loading}
                    >
                        <Text style={styles.btnText}>
                            {loading ? "Duke regjistruar..." : "REGISTER"}
                        </Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>ose</Text>
                    <View style={styles.divider} />
                </View>

                <GoogleSignInButton loading={loading} />
            </View>
        </SafeAreaView>
    );
}

function GoogleSignInButton({ loading }: { loading: boolean }) {
  const GOOGLE_CLIENT_ID =
    "277759569226-332qso79oku38r4i9u8v9lh4sodl77df.apps.googleusercontent.com";

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: GOOGLE_CLIENT_ID,
    redirectUri: "http://localhost:8081", 
  });

  useEffect(() => {
    if (response?.type === "success") {
      const idToken =
        response.params?.id_token ?? response.authentication?.idToken;

      if (!idToken) {
        Alert.alert("Gabim", "Google nuk dha ID token.");
        return;
      }

      const credential = GoogleAuthProvider.credential(idToken);

      signInWithCredential(auth, credential).catch((err) =>
        Alert.alert("Gabim", err.message)
      );
    }
  }, [response]);

  return (
    <TouchableOpacity
      style={[styles.btn, styles.googleButton]}
      onPress={() => promptAsync()}
      disabled={!request || loading}
    >
      <Text style={styles.btnText}>VAZHDO ME GOOGLE</Text>
    </TouchableOpacity>
  );
}



const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: "#121212" },
    center: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: "900",
        letterSpacing: 1,
        color: "#26423dff",
        marginBottom: 6,
    },
    subtitle: {
        fontSize: 16,
        color: "#EDEDED",
        opacity: 0.9,
        marginBottom: 24,
        textAlign: "center",
    },
    form: {
        width: "100%",
        alignItems: "center",
    },
    input: {
        width: "86%",
        backgroundColor: "#1E1E1E",
        borderRadius: 22,
        paddingVertical: 14,
        paddingHorizontal: 18,
        color: "#fff",
        marginBottom: 10,
    },
    btn: {
        width: "86%",
        paddingVertical: 16,
        borderRadius: 22,
        backgroundColor: "#2B2B2B",
        alignItems: "center",
        marginTop: 12,
    },
    primary: { backgroundColor: "#26423dff" },
    btnText: { color: "white", fontWeight: "800", letterSpacing: 1, fontSize: 16 },
    error: { color: "#ff6b6b", alignSelf: "flex-start", marginLeft: "7%", marginBottom: 6 },
    dividerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 28,
        width: "86%",
    },
    divider: { flex: 1, height: 1, backgroundColor: "#2F2F2F" },
    dividerText: { marginHorizontal: 8, color: "#EDEDED", opacity: 0.6 },
    googleBlockedContainer: { width: "100%", marginTop: 16, alignItems: "center" },
    googleButton: {
        backgroundColor: "#db4437",
        marginTop: 16,
    },
    googleHint: {
        marginTop: 8,
        textAlign: "center",
        color: "#EDEDED",
        opacity: 0.7,
        width: "86%",
    },
});

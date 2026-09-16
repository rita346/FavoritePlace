import {Alert, Image, Text, View,StyleSheet} from "react-native";
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from "expo-image-picker";
import {useState} from "react";
import {Colors} from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";

function ImagePicker() {
    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

    const [pickedImage, setPickedImage] = useState()

    async function verifyPermission() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
           const permissionResponse = await requestPermission();

           return permissionResponse.granted;
        }

        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('Insufficient Permission!',
                'You need to grant camera permissions to use this app.'
            );

            return false;
        }

        return true;
    }

    async function takeImageHandler() {
        const hasPermission = await verifyPermission();

        if (!hasPermission) {
            return;
        }

       const image = await launchCameraAsync({
           allowsEditing: true,
           aspectRatio: [16,9],
           quality: 0.5,
       });

        setPickedImage(image.uri);
    }

    let imagePreview = <Text>No image taken yet.</Text>

    if (pickedImage) {
        imagePreview = <Image source={{uri:pickedImage}} style={styles.image} />;
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            <OutlinedButton icon='camera' onPress={takeImageHandler} >
                Take Image
            </OutlinedButton>
        </View>
    )
}

export default ImagePicker;

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
})
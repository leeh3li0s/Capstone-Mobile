import { StyleSheet } from "react-native"; 

const MobileStylesheet = StyleSheet.create({

    mainContainer: {
        width: '100%',
        height: '100%',
        backgroundColor: "#ffffff",
        padding: 10,
        alignItems: 'center'
    },

    AppointmentServicesContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10,
        alignItems: 'center',
        justifyContent: 'center',

        marginTop: 50,
        width: '100%',
        height: '80%',
        backgroundColor: "#ffffff"
    },
    
    Services: {
        
        width: '48%',
        height: '30%',
        backgroundColor: "#ffffff",
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,

        borderColor: '#c9c9c9',
        borderWidth: 2,
    },

    Button: {
        backgroundColor: '#4F7CFF',
        width: '60%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },

    TimeSlot: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        padding: 10,
        borderRadius: 5,
        borderColor: '#d2d2d2',
        borderWidth: 2
    },

    DetailsCardComponent: {
        width: '40%',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        gap: 10
    }

});

export default MobileStylesheet;
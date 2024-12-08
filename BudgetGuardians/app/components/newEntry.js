export default function card({props}) {
    return (
        <>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.cardText}>{props.title}</Text>
                    <Text style={styles.cardText}>{props.amount}</Text>
                    <Text style={styles.cardText}>{props.date}</Text>
                </View>
            </View>
        </>
    );
    
}
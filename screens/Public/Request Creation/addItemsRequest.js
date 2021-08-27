import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import colorConstant from '../../../constants/colorConstant';

function AddItemsRequest(props) {
  const [items1, setItems1] = useState({item1: '', quantity1: ''});
  const [items2, setItems2] = useState({item2: '', quantity2: ''});
  const [items3, setItems3] = useState({item3: '', quantity3: ''});
  const [items4, setItems4] = useState({item4: '', quantity4: ''});
  const [items5, setItems5] = useState({item5: '', quantity5: ''});
  const [items6, setItems6] = useState({item6: '', quantity6: ''});
  const [items7, setItems7] = useState({item7: '', quantity7: ''});
  const [items8, setItems8] = useState({item8: '', quantity8: ''});
  const [items9, setItems9] = useState({item9: '', quantity9: ''});
  const [items10, setItems10] = useState({item10: '', quantity10: ''});

  const submitItems = () => {
    console.log(items1.quantity1);
    console.log(items1.item1);
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headingText}>Add Items for Request</Text>
        </View>
        <View style={styles.addItems}>
          <View style={styles.itemInput}>
            <TextInput
              mode="outlined"
              label="Items"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items1.item1}
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
                marginRight: 10,
              }}
              onChangeText={(text) => setItems1({item1: text})}
            />
          </View>
          <View style={styles.quantityInput}>
            <TextInput
              mode="outlined"
              label="No."
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items1.quantity1}
              keyboardType="numeric"
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setItems1({quantity1: text})}
            />
          </View>
        </View>
        <View style={styles.addItems}>
          <View style={styles.itemInput}>
            <TextInput
              mode="outlined"
              label="Items"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items2.item2}
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
                marginRight: 10,
              }}
              onChangeText={(text) => setItems2({item2: text})}
            />
          </View>
          <View style={styles.quantityInput}>
            <TextInput
              mode="outlined"
              label="No."
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items2.quantity2}
              keyboardType="numeric"
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setItems2({quantity2: text})}
            />
          </View>
        </View>
        <View style={styles.addItems}>
          <View style={styles.itemInput}>
            <TextInput
              mode="outlined"
              label="Items"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items3.item3}
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
                marginRight: 10,
              }}
              onChangeText={(text) => setItems3({item3: text})}
            />
          </View>
          <View style={styles.quantityInput}>
            <TextInput
              mode="outlined"
              label="No."
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items3.quantity3}
              keyboardType="numeric"
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setItems3({quantity3: text})}
            />
          </View>
        </View>
        <View style={styles.addItems}>
          <View style={styles.itemInput}>
            <TextInput
              mode="outlined"
              label="Items"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items4.item4}
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
                marginRight: 10,
              }}
              onChangeText={(text) => setItems4({item4: text})}
            />
          </View>
          <View style={styles.quantityInput}>
            <TextInput
              mode="outlined"
              label="No."
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items4.quantity4}
              keyboardType="numeric"
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setItems4({quantity4: text})}
            />
          </View>
        </View>
        <View style={styles.addItems}>
          <View style={styles.itemInput}>
            <TextInput
              mode="outlined"
              label="Items"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items5.item5}
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
                marginRight: 10,
              }}
              onChangeText={(text) => setItems5({item5: text})}
            />
          </View>
          <View style={styles.quantityInput}>
            <TextInput
              mode="outlined"
              label="No."
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items5.quantity5}
              keyboardType="numeric"
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setItems5({quantity5: text})}
            />
          </View>
        </View>
        <View style={styles.addItems}>
          <View style={styles.itemInput}>
            <TextInput
              mode="outlined"
              label="Items"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items6.item6}
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
                marginRight: 10,
              }}
              onChangeText={(text) => setItems6({item6: text})}
            />
          </View>
          <View style={styles.quantityInput}>
            <TextInput
              mode="outlined"
              label="No."
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items6.quantity6}
              keyboardType="numeric"
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setItems6({quantity6: text})}
            />
          </View>
        </View>
        <View style={styles.addItems}>
          <View style={styles.itemInput}>
            <TextInput
              mode="outlined"
              label="Items"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items7.item7}
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
                marginRight: 10,
              }}
              onChangeText={(text) => setItems7({item7: text})}
            />
          </View>
          <View style={styles.quantityInput}>
            <TextInput
              mode="outlined"
              label="No."
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items7.quantity}
              keyboardType="numeric"
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setItems7({quantity7: text})}
            />
          </View>
        </View>
        <View style={styles.addItems}>
          <View style={styles.itemInput}>
            <TextInput
              mode="outlined"
              label="Items"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items8.item8}
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
                marginRight: 10,
              }}
              onChangeText={(text) => setItems8({item8: text})}
            />
          </View>
          <View style={styles.quantityInput}>
            <TextInput
              mode="outlined"
              label="No."
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items8.quantity8}
              keyboardType="numeric"
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setItems8({quantity8: text})}
            />
          </View>
        </View>
        <View style={styles.addItems}>
          <View style={styles.itemInput}>
            <TextInput
              mode="outlined"
              label="Items"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items9.item9}
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
                marginRight: 10,
              }}
              onChangeText={(text) => setItems9({item9: text})}
            />
          </View>
          <View style={styles.quantityInput}>
            <TextInput
              mode="outlined"
              label="No."
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items9.quantity9}
              keyboardType="numeric"
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setItems9({quantity9: text})}
            />
          </View>
        </View>
        <View style={styles.addItems}>
          <View style={styles.itemInput}>
            <TextInput
              mode="outlined"
              label="Items"
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items10.item10}
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
                marginRight: 10,
              }}
              onChangeText={(text) => setItems10({item10: text})}
            />
          </View>
          <View style={styles.quantityInput}>
            <TextInput
              mode="outlined"
              label="No."
              selectionColor={colorConstant.primaryColor}
              outlineColor={colorConstant.primaryColor}
              underlineColor={colorConstant.primaryColor}
              value={items10.quantity10}
              keyboardType="numeric"
              style={{
                fontSize: 17,
                backgroundColor: '#ffffff',
              }}
              onChangeText={(text) => setItems10({quantity10: text})}
            />
          </View>
        </View>
        <View style={styles.btnContainer}>
          <Button
            mode="contained"
            onPress={() => submitItems()}
            style={{
              width: 120,
              height: 45,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colorConstant.primaryColor,
            }}>
            <Text style={{fontFamily: 'Barlow-Bold', fontSize: 16}}>
              PROCEED
            </Text>
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}

export default AddItemsRequest;

const styles = StyleSheet.create({
  mainContainer: {
    // flex: 1,
    // height: Dimensions.get('screen').height,
    flexDirection: 'column',
    backgroundColor: '#f8f8ff',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  addItems: {
    flexDirection: 'row',
    // flex: 2,
    // backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  itemInput: {
    flex: 4,
    // backgroundColor: 'red',
  },
  quantityInput: {
    flex: 1,
    // backgroundColor: 'blue',
  },

  headingContainer: {
    // flex: 1,
    alignItems: 'center',
    marginBottom: 15,
  },
  headingText: {
    fontFamily: 'Barlow-SemiBold',
    color: colorConstant.primaryColor,
    fontSize: 22,
  },

  btnContainer: {
    // flex: 1,
    alignItems: 'flex-end',
    marginBottom: 20,
    marginTop: 10,
  },
});

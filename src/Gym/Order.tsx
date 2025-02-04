import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';

const App = () => {
  const data = [
    { id: 1, imageUrl: 'https://specials-images.forbesimg.com/imageserve/66d78f97e5b687f8138a2754/960x0.jpg', name: 'OPTINIUM NUTRITION', amount: 250, stock: 10 },
    { id: 2, imageUrl: 'https://media.post.rvohealth.io/wp-content/uploads/2023/07/3040632-The-12-Best-Vegan-Protein-Powders-732x549-Feature-732x549.jpg', name: 'KOS', amount: 300, stock: 8 },
    { id: 3, imageUrl: 'https://www.leefordonline.in/images/ProductImages/large/645de242081e2-1683874370.jpg', name: 'MEGA GROW', amount: 300, stock: 5 },
    { id: 4, imageUrl: 'https://cdn.shopify.com/s/files/1/2393/2199/files/PHM_Chocolate_500g_400X400.jpg', name: 'OZIVA', amount: 300, stock: 15 },
  ];

  const [contacts, setContacts] = useState([
    {
      Uid: 1,
      Name: 'John Doe',
      TimeSlot: 'Morning',
      Status: 'Active',
      Plan: 'Monthly',
      Amount: 2000,
      Attendance: 'Absent',
      purchasedDate: '2024-11-15',
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  useEffect(() => {
    setFilteredData(data);
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    const filtered = data.filter((item) =>
      item.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      Alert.alert('Notice', `${item.name} is already in the cart.`);
    } else if (item.stock > 0) {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
      setTotalAmount(prevTotal => prevTotal + item.amount);
      Alert.alert('Success', `${item.name} added to cart!`);
    } else {
      Alert.alert('Out of Stock', `${item.name} is no longer available.`);
    }
  };

  const incrementQuantity = (id) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        if (item.stock > 1) {
          setTotalAmount(prevTotal => prevTotal + item.amount);
          item.stock -= 1; // Reduce stock
          return { ...item, quantity: item.quantity + 1 };
        } else {
          Alert.alert('Out of Stock', `${item.name} cannot be added.`);
        }
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  const decrementQuantity = (id) => {
    const updatedCart = cartItems
      .map(item => {
        if (item.id === id) {
          if (item.quantity > 1) {
            setTotalAmount(prevTotal => prevTotal - item.amount);
            item.stock += 1; // Restore stock
            return { ...item, quantity: item.quantity - 1 };
          } else {
            setTotalAmount(prevTotal => prevTotal - item.amount);
            item.stock += 1; // Restore stock
            return null; // Remove the item from the cart
          }
        }
        return item;
      })
      .filter(Boolean); // Remove null entries (items with quantity 0)
    setCartItems(updatedCart);
  };

  if (showCart) {
    const handlePayment = (method) => {
      if (cartItems.length === 0) {
        Alert.alert('Cart Empty', 'Please add items to your cart before proceeding to payment.');
        return;
      }
    
      const paymentDetails = {
        method,
        items: cartItems,
        totalAmount,
      };
    
      console.log('Processing Payment...', paymentDetails);
    
      Alert.alert(
        'Payment Successful',
        `Your order will be processed with ${method} payment.`,
        [
          {
            text: 'OK',
            onPress: () => {
              // Update the stock of items in the main data array
              const updatedData = data.map(item => {
                const cartItem = cartItems.find(cart => cart.id === item.id);
                if (cartItem) {
                  return { ...item, stock: item.stock - cartItem.quantity };
                }
                return item;
              });
    
              setCartItems([]);
              setTotalAmount(0);
              setShowCart(false);
              setFilteredData(updatedData);
            },
          },
        ]
      );
    };
    

    return (
      <View style={styles.container}>
       <View style={styles.cartHeader}>
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => setShowCart(false)}
    >
      <Text style={styles.backButtonText}>Back</Text>
    </TouchableOpacity>
    <Text style={styles.cartTitle}>Cart</Text>
  </View>


        {cartItems.length > 0 ? (
          <ScrollView>
            {cartItems.map((item, index) => (
              <View key={index} style={styles.cartItem}>
                <Image source={{ uri: item.imageUrl }} style={styles.cartImage} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.cartItemText}>{item.name}</Text>
                  <Text style={styles.cartItemText}>₹{item.amount}</Text>
                  <View style={styles.quantityContainer}>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => decrementQuantity(item.id)}
                    >
                      <Text style={styles.quantityButtonText}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.quantityButton}
                      onPress={() => incrementQuantity(item.id)}
                    >
                      <Text style={styles.quantityButtonText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
            <Text style={styles.totalAmount}>Total: ₹{totalAmount}</Text>
          </ScrollView>
        ) : (
          <Text style={styles.emptyCartText}>Your cart is empty!</Text>
        )}
        <View style={styles.paymentOptionsContainer}>
          <TouchableOpacity style={styles.onlineButton} onPress={() => handlePayment('Online')}>
            <Text style={styles.buttonText}>Online</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cashButton} onPress={() => handlePayment('Cash')}>
            <Text style={styles.buttonText}>Cash</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    {contacts.map((contacts) => (
      <View key={contacts.Uid} style={styles.header}>

        <Image
          source={{ uri: 'https://www.shutterstock.com/image-vector/default-avatar-profile-icon-transparent-600nw-2463868853.jpg' }} // Replace with your image URL
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{contacts.Name}</Text>
      </View>
    ))}

      <TextInput
        style={styles.searchBar}
        placeholder="Search by name"
        placeholderTextColor="#999"
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <ScrollView style={styles.cardWrapper}>
        {filteredData.map((item) => (
          <View key={item.id} style={styles.card}>
            <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardAmount}>Stock: {item.stock}</Text>
              <Text style={styles.cardAmount}>₹ {item.amount}</Text>
            </View>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => addToCart(item)}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.cartButton} onPress={() => setShowCart(true)}>
        <Text style={styles.buttonText}>Go to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FFFFFF', // Neutral background for a clean look
  },
  searchBar: {
    height: 50,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#F8F8F8',
    color: 'black',
    fontSize: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Subtle shadow for depth
  },
  cardWrapper: {
    flex: 1,
    marginBottom: 70, // To prevent overlap with the cart button
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15, // Slightly more rounded corners for modern feel
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6, // Increased elevation for a floating effect
    borderWidth: 1,
    borderColor: '#E0E0E0', // Subtle border for better definition
    overflow: 'hidden', // Ensures content stays within the card's bounds
  },
  cardImage: {
    width: '100%',
    height: 180, // Increased height for better visual impact
    borderRadius: 15, // Matches the card's border radius
  },
  cardContent: {
    marginVertical: 12,
    paddingHorizontal: 5,
  },
  cardTitle: {
    fontSize: 20, // Increased size for emphasis
    fontWeight: 'bold',
    color: '#212121', // Darker color for better readability
    marginBottom: 5,
  },
  cardAmount: {
    fontSize: 16,
    fontWeight: '500',
    color: '#757575', // Neutral color for secondary information
  },
  addToCartButton: {
    backgroundColor: '#FF7043', // Warm and vibrant color for the call-to-action button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25, // Rounded button for a modern look
    alignItems: 'center',
    alignSelf: 'stretch', // Full-width button
    shadowColor: '#FF7043',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  cartButton: {
    backgroundColor: '#43A047', // Modern green for the cart button
    padding: 15,
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    borderRadius: 30, // Rounded button for a sleek design
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4, // Adds depth to the button
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#FAFAFA',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cartImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginRight: 10,
  },
  cartItemText: {
    fontSize: 16,
    color: '#424242',
    marginBottom: 5,
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#9E9E9E',
    marginTop: 30,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  quantityButton: {
    backgroundColor: '#E0E0E0',
    padding: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
    color: '#212121',
  },
  paymentOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  onlineButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cashButton: {
    backgroundColor: '#8BC34A',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  goBackButton: {
    position: 'absolute', // Position the button on the left side
    left: 10, // Adjust for proper spacing
    backgroundColor: 'transparent',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    // backgroundColor: '#008000',
    padding: 5,
    borderRadius: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  cartHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  backButton: {
    position: 'absolute',
    left: 10,
    zIndex: 1, // Ensures the button is on top
  },
  backButtonText: {
    color: '#2196F3', // Blue color for the button text
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1, // Ensure it spans the full width
    color: '#424242',
  },  
});

export default App;

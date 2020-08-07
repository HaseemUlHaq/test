import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import Carousel from 'react-native-snap-carousel';

const screen = Dimensions.get('window');
export default class App extends Component {
  state = {
    photos: [],
    blue: [],
    green: [],
    purple: [],
  };
  componentDidMount() {
    this.getPhotos();
  }

  getPhotos = async () => {
    const {data} = await axios.get(
      `https://jsonplaceholder.typicode.com/photos`,
    );
    var blue = [];
    var green = [];
    var purple = [];
    data.forEach((item, idx) => {
      if (item.albumId === 1) {
        green.push(item);
      }
      if (item.albumId === 2) {
        blue.push(item);
      }
      if (item.albumId === 3) {
        purple.push(item);
      }
    });

    console.log('data :: ', blue, green, purple);
    this.setState({
      photos: data,
      green: [green[green.length - 1], green[green.length - 2]],
      blue: [blue[blue.length - 1], blue[blue.length - 2]],
      purple: [purple[purple.length - 1], purple[purple.length - 2]],
    });
  };

  renderItem = ({item}) => {
    return (
      <View style={styles.imgContainer}>
        <Text style={styles.imgTitle}>{item.title}</Text>
        <Image style={styles.img} source={{uri: item.url}} />
      </View>
    );
  };

  render() {
    const {green, blue, purple} = this.state;
    return (
      <View style={styles.container}>
        {green.length || blue.length || purple.length ? (
          <>
            <View style={[styles.carousalContainer, {borderColor: 'green'}]}>
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={green}
                renderItem={this.renderItem}
                sliderWidth={screen.width}
                itemWidth={screen.width}
              />
            </View>
            <View style={[styles.carousalContainer, {borderColor: 'blue'}]}>
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={blue}
                renderItem={this.renderItem}
                sliderWidth={screen.width}
                itemWidth={screen.width}
              />
            </View>
            <View style={[styles.carousalContainer, {borderColor: 'purple'}]}>
              <Carousel
                ref={c => {
                  this._carousel = c;
                }}
                data={purple}
                renderItem={this.renderItem}
                sliderWidth={screen.width}
                itemWidth={screen.width}
              />
            </View>
          </>
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  imgContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: screen.width,
  },
  carousalContainer: {
    borderWidth: 2,
    overflow: 'hidden',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  innerContainer: {
    flexDirection: 'row',
  },
  img: {
    width: 100,
    height: 100,
  },
});

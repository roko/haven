import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform } from 'react-native';
import {
  HueSlider, SaturationSlider, LightnessSlider
} from 'react-native-color';
import tinycolor from 'tinycolor2';

class EditSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: tinycolor('#70c1b3').toHsl()
    };
  }

  updateHue = h => this.setState({ color: { ...this.state.color, h } });
  updateSaturation = s => this.setState({ color: { ...this.state.color, s } });
  updateLightness = l => this.setState({ color: { ...this.state.color, l } });

  render() {
    const overlayTextColor = tinycolor(this.state.color).isDark()
      ? '#FAFAFA'
      : '#222';
    return (
      <View>
        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { this.props.changeView('default') }}
          >
            <Text style={styles.text}>Go back</Text>
          </TouchableOpacity>
        </View>

        <View>
          <TouchableOpacity
            style={styles.button}
            onPress={() => { this.props.updateColor(tinycolor(this.state.color).toHexString()); this.props.changeView('default') }}
          >
            <Text style={styles.text}>Update to this color!</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.componentText}>Change your Haven color!</Text>
          <TouchableOpacity
            onPress={() => this.setState({ modalVisible: true })}
            style={[
              styles.colorPreview,
              { backgroundColor: tinycolor(this.state.color).toHslString() }
            ]}
          >
            <Text style={[styles.colorString, { color: overlayTextColor }]}>
              {tinycolor(this.state.color).toHexString()}
            </Text>
          </TouchableOpacity>

          <Text style={styles.componentText}>Hue</Text>
          <HueSlider
            style={styles.sliderRow}
            gradientSteps={40}
            value={this.state.color.h}
            onValueChange={this.updateHue}
          />
          <Text style={styles.componentText}>Saturation</Text>
          <SaturationSlider
            style={styles.sliderRow}
            gradientSteps={20}
            value={this.state.color.s}
            color={this.state.color}
            onValueChange={this.updateSaturation}
          />
          <Text style={styles.componentText}>Lightness</Text>
          <LightnessSlider
            style={styles.sliderRow}
            gradientSteps={20}
            value={this.state.color.l}
            color={this.state.color}
            onValueChange={this.updateLightness}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    paddingBottom: 16
  },
  button: {
    alignItems: 'center',
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'rgb(26,201,141)',
    borderRadius: 10,
    borderWidth: 1
  },
  content: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingHorizontal: 32,
    paddingBottom: 32
  },
  headerText: {
    marginTop: 24,
    fontSize: 34,
    lineHeight: 41,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-bold'
      },
      ios: {
        fontWeight: '700',
        letterSpacing: 0.41
      }
    })
  },
  sectionText: {
    marginTop: 32,
    color: '#222',
    fontSize: 22,
    lineHeight: 28,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium'
      },
      ios: {
        fontWeight: '600',
        letterSpacing: 0.75
      }
    })
  },
  componentText: {
    marginTop: 16,
    color: '#222',
    fontSize: 16,
    lineHeight: 21,
    ...Platform.select({
      android: {
        fontFamily: 'sans-serif-medium'
      },
      ios: {
        fontWeight: '600',
        letterSpacing: -0.408
      }
    })
  },
  colorPreview: {
    marginLeft: 12,
    marginTop: 12,
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 3,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.25
  },
  gradient: {
    alignSelf: 'stretch',
    marginLeft: 12,
    marginTop: 12,
    marginBottom: 16,
    height: 4
  },
  sliderRow: {
    alignSelf: 'stretch',
    marginLeft: 12,
    marginTop: 12
  },
  colorString: {
    fontSize: 34,
    lineHeight: 41,
    ...Platform.select({
      android: {
        fontFamily: 'monospace'
      },
      ios: {
        fontFamily: 'Courier New',
        fontWeight: '600',
        letterSpacing: 0.75
      }
    })
  }
});

export default EditSettings;
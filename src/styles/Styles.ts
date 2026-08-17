import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const WHEEL_SIZE = width * 0.8;

/**
 * =========================
 * PET RENDERING LAYERS
 * =========================
 */
export const petStyles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#000',
  },

  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
  },

  imageFill: {
    width: '100%',
    height: '100%',
  },

  faceContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  face: {
    width: 300,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },

  eyeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },

  eyeBase: {
    width: 90,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    zIndex: 10,
  },

  pupil: {
    width: 35,
    height: 35,
    backgroundColor: 'black',
    borderRadius: 17.5,
    position: 'absolute',
    zIndex: 20,
  },

  mouthContainer: {
    marginTop: 0,
    height: 120,
    width: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },

  mouthShape: {
    width: 100,
    height: 25,
    backgroundColor: '#333',
    borderRadius: 12.5,
  },

  mouthOpen: {
    height: 70,
    borderRadius: 35,
  },

  mouthImage: {
    width: '100%',
    height: '100%',
  },
});


/**
 * =========================
 * GAME UI LAYERS
 * =========================
 */
export const gameStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },

  petLayer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  touchLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 2,
  },

  uiLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,   // High zIndex
    elevation: 100,
  },

  settingsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    padding: 10,
    zIndex: 110,
    elevation: 110,
  },

  menuButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 110,
    elevation: 110,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },

  iconText: {
    fontSize: 30,
  },

  miniStatsContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    width: 100,
    zIndex: 110,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 10,
  },

  miniStatBar: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 2,
    marginTop: 4,
    overflow: 'hidden',
  },

  miniStatFill: {
    height: '100%',
  },

  miniStatLabel: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },

  toy: {
    position: 'absolute',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 60,
    elevation: 60,
  },

  toyEmoji: {
    fontSize: 40,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  statusCard: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },

  statusTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },

  statRow: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
    marginVertical: 10,
  },

  statLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },

  statLabel: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },

  progressBarContainer: {
    width: '100%',
    height: 10,
    backgroundColor: '#eee',
    borderRadius: 5,
    overflow: 'hidden',
  },

  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },

  deltaText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },

  closeButton: {
    marginTop: 20,
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },

  closeButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },

  sleepOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 50, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 105,
  },

  sleepText: {
    fontSize: 80,
    color: 'white',
    opacity: 0.8,
  },

  heart: {
    position: 'absolute',
    fontSize: 40,
    zIndex: 200,
  },
});


/**
 * =========================
 * MENU WHEEL
 * =========================
 */
export const menuStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    elevation: 1000,
  },

  wheelContainer: {
    width: WHEEL_SIZE,
    height: WHEEL_SIZE,
    justifyContent: 'center',
    alignItems: 'center',
  },

  segment: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  label: {
    fontSize: 30,
  },
});


/**
 * =========================
 * APP ROOT
 * =========================
 */
export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
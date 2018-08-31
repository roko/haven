class PlaylistItem {
    constructor(name, uri, image) {
      this.name = name;
      this.uri = uri;
      this.image = image;
    }
  }

const PLAYLIST = [
    new PlaylistItem(
      'Tibetan Singing Bowl',
      'https://res.cloudinary.com/dwysumxzw/video/upload/v1535686335/tibetan-singing-bowl.wav',
      'https://res.cloudinary.com/dwysumxzw/image/upload/v1535688205/Screen_Shot_2018-08-30_at_9.02.49_PM.png'
    ),
    new PlaylistItem(
      'Breathing Meditation (3m)',
      'https://res.cloudinary.com/dwysumxzw/video/upload/v1535686321/breathing-meditation-three-min.mp3',
      'https://res.cloudinary.com/dwysumxzw/image/upload/v1535690050/Screen_Shot_2018-08-30_at_9.33.16_PM.png'
    ),
    new PlaylistItem(
      'Early Morning Songbirds',
      'https://res.cloudinary.com/dwysumxzw/video/upload/v1535690382/Sound-therapy-morning-birds.mp3',
      'https://res.cloudinary.com/dwysumxzw/image/upload/v1535690441/Screen_Shot_2018-08-30_at_9.40.10_PM.png'
    ),
    new PlaylistItem(
      'Water on Oars',
      'https://res.cloudinary.com/dwysumxzw/video/upload/v1535686309/rowing-a-boat.mp3',
      'https://res.cloudinary.com/dwysumxzw/image/upload/v1535688604/Screen_Shot_2018-08-30_at_9.06.48_PM.png'
    ),
    new PlaylistItem(
      'Campfire',
      'https://res.cloudinary.com/dwysumxzw/video/upload/v1535686325/campfire.mp3',
      'https://res.cloudinary.com/dwysumxzw/image/upload/v1535688205/Screen_Shot_2018-08-30_at_8.50.30_PM.png'
    ),
    new PlaylistItem(
      'Body Scan Meditation (4m)',
      'https://res.cloudinary.com/dwysumxzw/video/upload/v1535686318/body-scan-meditation-four-min.mp3',
      'https://res.cloudinary.com/dwysumxzw/image/upload/v1535688344/Screen_Shot_2018-08-30_at_9.05.19_PM.png'
    ),
    new PlaylistItem(
      'Heavy Rain',
      'https://res.cloudinary.com/dwysumxzw/video/upload/v1535688106/Heavy-summer-rain-sound-effect.mp3',
      'https://res.cloudinary.com/dwysumxzw/image/upload/v1535688206/Screen_Shot_2018-08-30_at_9.02.28_PM.png'
    ),
    new PlaylistItem(
      'Guided Relaxation Meditation (4m)',
      'https://res.cloudinary.com/dwysumxzw/video/upload/v1535689506/relax.mp3',
      'https://res.cloudinary.com/dwysumxzw/image/upload/v1535688344/Screen_Shot_2018-08-30_at_9.05.19_PM.png'
    ),
    new PlaylistItem(
      'Peter Meows Reggae',
      'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3',
      'https://res.cloudinary.com/dwysumxzw/image/upload/v1535689252/Screen_Shot_2018-08-30_at_9.18.55_PM.png'
    ),
  ];

  export default PLAYLIST;
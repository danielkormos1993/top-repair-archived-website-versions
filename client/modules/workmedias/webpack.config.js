module.exports = [
    {
        output: {
            filename: './WorkmediasLongBundle.js',
        },
        name: 'WorkmediasLong',
        entry: './src/WorkmediasLong.js',
        mode: 'production',
    },
    {
        output: {
          filename: './WorkmediasShortBundle.js',
        },
        name: 'WorkmediasShort',
        entry: './src/WorkmediasShort.js',
        mode: 'production',
    }
  ];
module.exports = [
    {
        output: {
            filename: './WorkmediasLongBundle.js',
        },
        name: 'WorkmediasLong',
        entry: './WorkmediasLong.js',
        mode: 'production',
    },
    {
        output: {
          filename: './WorkmediasShortBundle.js',
        },
        name: 'WorkmediasShort',
        entry: './WorkmediasShort.js',
        mode: 'production',
    }
  ];
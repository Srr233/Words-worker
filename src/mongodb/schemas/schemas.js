import mongoose from 'mongoose';

const Words = mongoose.model('Words', {
    from: String,
    to: String,
    repeated: Number,
    id: String
});

export default Words;

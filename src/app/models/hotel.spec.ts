import { Hotel } from './hotel';

describe('Hotel', () => {
  it('should create an instance', () => {
    expect(new Hotel({
      id: 1,
      name: "Shinagawa Prince Hotel",
      rating: 7.7,
      stars: 4,
      address: "108-8611 Tokyo Prefecture, Minato-ku, Takanawa 4-10-30, Japan",
      photo: "https://d2ey9sqrvkqdfs.cloudfront.net/ZqSQ/i1_t.jpg",
      description: "<p>Test1</p>"
    })).toBeTruthy();
  });
});

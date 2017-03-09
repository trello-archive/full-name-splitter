import assert from 'assert';
import splitter from './../../src/full-name-splitter.js';

const expectations = [
  ["John Smith", ["John", "Smith" ]],
  ["John", ["John", null]],

  ["Kevin J. O'Connor", ["Kevin J.", "O'Connor" ]],
  ["Gabriel Van Helsing", ["Gabriel", "Van Helsing" ]],
  ["Pierre de Montesquiou", ["Pierre", "de Montesquiou" ]],
  ["Charles d'Artagnan", ["Charles", "d'Artagnan" ]],
  ["Ben Butler-Sandwich", ["Ben", "Butler-Sandwich" ]],
  ["Noda' bi-Yehudah", ["Noda'", "bi-Yehudah" ]],
  ["Maria del Carmen Menendez", ["Maria", "del Carmen Menendez" ]],
  ["Alessandro Del Piero", ["Alessandro", "Del Piero" ]],

  ["George W Bush", ["George W", "Bush" ]],
  ["George H. W. Bush", ["George H. W.", "Bush" ]],
  ["James K. Polk", ["James K.", "Polk" ]],
  ["William Henry Harrison", ["William Henry", "Harrison" ]],
  ["John Quincy Adams", ["John Quincy", "Adams" ]],

  ["John Quincy", ["John", "Quincy" ]],
  ["George H. W.", ["George H. W.", null]],
  ["Van Helsing", [null, "Van Helsing" ]],
  ["d'Artagnan", [null, "d'Artagnan" ]],
  ["O'Connor", [null, "O'Connor" ]],

  ["George", ["George", null]],
  ["Kevin J. ", ["Kevin J.", null]],

  ["Thomas G. Della Fave", ["Thomas G.", "Della Fave" ]],
  ["Anne du Bourg", ["Anne", "du Bourg" ]],

  // German
  ["Johann Wolfgang von Goethe", ["Johann Wolfgang", "von Goethe" ]],

  // Spanish-speaking countries
  ["Juan Martín de la Cruz Gómez", ["Juan Martín", "de la Cruz Gómez" ]],
  ["Javier Reyes de la Barrera", ["Javier", "Reyes de la Barrera" ]],
  ["Rosa María Pérez Martínez Vda. de la Cruz",
     ["Rosa María", "Pérez Martínez Vda. de la Cruz"]],

  // Italian
  ["Federica Pellegrini", ["Federica", "Pellegrini" ]],
  ["Leonardo da Vinci", ["Leonardo", "da Vinci" ]],
  // sounds like a fancy medival action movie star pseudonim
  ["Alberto Del Sole", ["Alberto", "Del Sole" ]],
  // horror movie star pseudonim?
  ["Adriano Dello Spavento", ["Adriano", "Dello Spavento" ]],
  ["Luca Delle Fave", ["Luca", "Delle Fave" ]],
  ["Francesca Della Valle", ["Francesca", "Della Valle" ]],
  ["Guido Delle Colonne", ["Guido", "Delle Colonne" ]],
  ["Tomasso D'Arco", ["Tomasso", "D'Arco" ]],

  // Dutch
  ["Johan de heer Van Kampen", ["Johan", "de heer Van Kampen" ]],
  ["Han Van De Casteele", ["Han", "Van De Casteele" ]],
  ["Han Vande Casteele", ["Han", "Vande Casteele" ]],
  ["Albert Van Der Haart", ["Albert", "Van Der Haart"]],

  // Exceptions?
  // the architect Ludwig Mies van der Rohe, from the West German city of Aachen, was originally Ludwig Mies;
  ["Ludwig Mies van der Rohe", ["Ludwig", "Mies van der Rohe" ]],

  ["E. Mark Slater", ["E. Mark", "Slater"]],
  ["Ken E. Mark Slater", ["Ken E. Mark", "Slater"]],
  ["Lord Sebastian Coe", ["Sebastian", "Coe"]],
  ["King Richard V", ["King", "Richard"]],
  ["Dr Who", [null, "Who"]],
  ["Mr Van", [null, "Van"]],
  ["Marie-Anne Richmond-Smithe", ["Marie-Anne", "Richmond-Smithe"]],

  // Test ignoring unnecessary whitespaces
  ["\t Ludwig  Mies\t van der Rohe ", ["Ludwig", "Mies van der Rohe" ]],
  ["\t van  der Rohe,\t Ludwig  Mies ", ["Ludwig Mies", "van der Rohe" ]],
  ["\t Ludwig      ", ["Ludwig", null]],
  ["  van  helsing ", [null, "van helsing"]],
  [", van  helsing ", ["van helsing", null]],
  ["\t van  der Rohe,\t Ludwig  Mies ", ["Ludwig Mies", "van der Rohe" ]],

  // from humanparser
  ['Mr. William R. Hearst, III', ['William R.', 'Hearst']],
  ['William Randolph Hearst', ['William Randolph', 'Hearst']],
  ['William R. De La Cruz', ['William R.', 'De La Cruz']],
  ['Mr. William R. De La Cruz III', ['William R.', 'De La Cruz']],
  ['William De Cruz', ['William', 'De Cruz']],
  ['William De La Cruz', ['William', 'De La Cruz']],
  ['William A. B. De La Cruz', ['William A. B.', 'De La Cruz']],
  ['James Hugh Calum Laurie', ['James Hugh Calum', 'Laurie']],
  ['Kiefer William Frederick Dempsey George Rufus Sutherland',
      ['Kiefer William Frederick Dempsey George Rufus', 'Sutherland']],
  ['William Hearst', ['William', 'Hearst']],
  ['William Hearst Jr', ['William', 'Hearst']],
  ['Hearst, William Jr', ['William', 'Hearst']],
  ['Hearst, William Randolph', ['William Randolph', 'Hearst']],
  ['Hearst, William, M.D.', ['William', 'Hearst']],
  ['William', ['William', null]],
  ['',  [null, null]],

  // from humanname
  ["John Doe", ["John", "Doe"]],
  ["Mr Anthony R Von Fange III", ["Anthony R", "Von Fange"]],
  ["Sara Ann Fraser", ["Sara Ann", "Fraser"]],
  ["Adam", ["Adam", null]],
  ["Jonathan Smith", ["Jonathan", "Smith"]],
  ["Anthony Von Fange III", ["Anthony", "Von Fange"]],
  ["Mr John Doe", ["John", "Doe"]],
  ["Smarty Pants Phd", ["Smarty", "Pants"]],
  ["Mark P Williams", ["Mark P", "Williams"]]
];

describe('full-name-splitter', function() {
  expectations.forEach( ([fullName, expected]) => {
    it(`${fullName} should split to [${expected[0]}, ${expected[1]}]`, function() {
      const split = splitter(fullName);
      assert(split[0] == expected[0]);
      assert(split[1] == expected[1]);
    });
  });
});

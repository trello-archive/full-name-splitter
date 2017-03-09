import assert from 'assert';
import splitter from './../../src/full-name-splitter.js';

describe('full-name-splitter', function() {
  const expectations = [
    ["John Smith", ["John", "Smith" ]],

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

    // Exceptions?
    // the architect Ludwig Mies van der Rohe, from the West German city of Aachen, was originally Ludwig Mies;
    ["Ludwig Mies van der Rohe", ["Ludwig", "Mies van der Rohe" ]],

    // Test ignoring unnecessary whitespaces
    ["\t Ludwig  Mies\t van der Rohe ", ["Ludwig", "Mies van der Rohe" ]],
    ["\t van  der Rohe,\t Ludwig  Mies ", ["Ludwig Mies", "van der Rohe" ]],
    ["\t Ludwig      ", ["Ludwig", null]],
    ["  van  helsing ", [null, "van helsing" ]],
    [", van  helsing ", ["van helsing", null]],
    ["\t van  der Rohe,\t Ludwig  Mies ", ["Ludwig Mies", "van der Rohe" ]],

  ];

  expectations.forEach( ([fullName, expected]) => {
    it(`${fullName} should split to [${expected[0]}, ${expected[1]}]`, function() {
      const split = splitter(fullName);
      assert(split[0] == expected[0]);
      assert(split[1] == expected[1]);
    });
  });
});

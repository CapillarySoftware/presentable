if ! type "ghc" > /dev/null; then
  echo "Haskell not found, installing Haskell";
  sudo apt-get install ghc;
  export PATH="$PATH:$HOME/.cabal/bin";
  echo "PLEASE UPDATE YOUR PATH TO INCLUDE $HOME/.cabal/bin (its been done for you in this session)";
fi

if ! type "psc" > /dev/null; then
  echo "PureScript not found, installing PureScript";
  cabal update;
  cabal install purescript;
fi

if ! type "npm" > /dev/null; then
  echo "Node.js not found, installing Node.js";
  sudo apt-get install nodejs;
fi

npm update;

if ! type "gulp" > /dev/null; then
  echo "Gulp not found, installing Gulp";
  sudo npm install -g gulp;
fi

if ! type "bower" > /dev/null; then
  echo "Bower not found, installing Bower";
  sudo npm install -g bower;
fi 

if ! type "karma" > /dev/null; then
  echo "Karma not found, installing Karma";
  sudo npm install -g karma karma-cli phantomjs;
fi 

echo "installing dependencies from npm and bower";
npm install;
bower update;
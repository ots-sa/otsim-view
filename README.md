# Parkalot Web

Η frontend διαχειριστική εφαρμογή του Parkalot.

## Τεχνολογίες

* [AngularJS](https://angularjs.org/)
* [Yarn](https://yarnpkg.com/en/) - Fast, reliable, and secure dependency management
* [Gulp](https://gulpjs.com/) as runner / Build system
* [Metronic](http://keenthemes.com/metronic-theme/) theme.

## Contributing
 
See [CONTRIBUTING.md](CONTRIBUTING.md)

## Requirements

1. [NodeJS](http://nodejs.org/). Με την εγκατάσταση, δημιουργείται νέο command prompt (Node.js command prompt), το οποίο χρησιμοποιήται για το compilation των ```.sass``` αρχείων και την χρήση δοκιμαστικού server.
   > Σημείωση: Αν δεν έχετε δικαιώματα διαχειριστή, υπάρχει ενδεχόμενο να πρέπει να ανοίξει το Node.js command prompt ως διαχειριστής.
1. [Git](https://msysgit.github.io/) client. Από το git-bash μπορείτε να διαχειριστείτε το project με οτιδήποτε σχετίζεται με το gitlab (clone, push, κτλ). Προσθήκη του ```$GIT_ROOT\bin``` (αντικαθιστάτε το ```$GIT_ROOT``` με το path στο οποίο έχει εγκατασταθεί το Git) στη μεταβλητή συστήματος ```PATH```.

Από το command prompt του Node.js (ή το shell του Linux) ελέγχουμε:
   1. Έλεγχος σωστής εγκατάστασης όλων των παραπάνω:
      ```bash
      node -v \
      && npm --version \
      && git --version
      ```
      
      Εφ' όσον έχει γίνει σωστή εγκατάσταση θα πρέπει να εμφανιστούν τρεις διαφορετικές εκδόσεις. Το output θα μοιάζει περίπου όπως το παρακάτω:
      ```
      v6.9.5
      3.10.10
      git version 2.11.0.windows.3
      ```

## Install project dependencies

Το project χρησιμοποιεί το [Gulp](https://gulpjs.com/) runner για να τρέξει και το [Yarn](https://yarnpkg.com/en/) για dependency management. Για να εγκατασταθούν, ακολουθούμε τα παρακάτω βήματα:

1. Launch cmd.exe or any relevant command line tool and change the directory into the project root, where the ```gulpfile.js``` is located.
1. Run ```npm install -g yarn``` to ensure Yarn is available globally for any project.
1. Run ```yarn install``` in order to install all project dependencies. If this command succeeds you will see a ```node_modules``` directory to project root directory.

## Run project using NodeJS

We can run the application using NodeJS or any other web server like Apache.

1. Launch ```cmd.exe``` (Windows) or any relevant command line tool and ``CD`` to your project root where gulpfile.js is located.
1. Run ```gulp sass && gulp minify && gulp localhost``` command to start the localhost server. Now you can open up localhost:9001 in your browser, where you will see the application.

## Run project using Apache Server

We can run the application using a web server like [Apache](https://httpd.apache.org/).

1. Create a virtual host in apache server pointing to the application directory with the following configuration:
      ```apache
      # Specify the port we are listening to
      Listen 86

      ## GLOBAL VARIABLES 
      ## (set according to your installation)

      # Application directory (absolute path)
      Define APPDIR "/home/parkabob/js-projects/parkalot-web/app"

      # Define the Parkalot application server address and port in a global variable.
      #
      # NOTE: You may put the address and port of a load balancer
      # which organises the traffic to Ydatapi application servers (IP:port)
      Define PARKALOT_API_HOST "10.0.3.12:8080"

      ##
      # Virtual Host Context
      ##
      <VirtualHost _default_:86>
      DocumentRoot "${APPDIR}"

      Alias /assets "${APPDIR}/../assets"
            Alias /node_modules "${APPDIR}/../node_modules"

            ErrorLog "logs/error.log"
            <IfModule log_config_module>
                  CustomLog "logs/access.log" combined
            </IfModule>

            # Rewrite rules for AngularJS application
            <IfModule mod_rewrite.c>
                  RewriteEngine On   

                  RewriteCond %{REQUEST_FILENAME} !-f
                  RewriteCond %{REQUEST_FILENAME} !-d
                  RewriteCond %{REQUEST_URI} !index
                  RewriteCond %{REQUEST_URI} !.*\.(css|js|html|png|jpg|jpeg|gif|webp)
                  RewriteCond %{REQUEST_URI} !.*\.(gif|ico|jpe?g|png|svg|svgz|webp)
                  RewriteCond %{REQUEST_URI} !.*\.(eot|font.css|otf|ttc|ttf|woff)
                  
                  # disable rewriting for requests targeting Api 
                  RewriteCond %{REQUEST_URI} !parkalot/api
                  
                  # if it is a search engine robot
                  RewriteCond %{REQUEST_URI} !robots.txt
                  RewriteRule . /index.html [L]
            </IfModule>
            
            # Proxy settings
            ProxyPass /parkalot http://${PARKALOT_API_HOST}/parkalot
            ProxyPassReverse /parkalot http://${PARKALOT_API_HOST}/parkalot
            ProxyTimeout 300
            
      </VirtualHost>                                  
      ```
1. Launch ```cmd.exe``` (Windows) or any relevant command line tool and ``CD`` to your project root where gulpfile.js is located.
1. Run ```gulp sass && gulp minify``` to run the scss . 
1. Now you can open up localhost:86 in your browser, where you will see the application.

## SASS Compilation

1. Launch ```cmd.exe``` or any relevant command line tool and CD to your theme directly where gulpfile.js is located.
1. Run ```gulp sass``` command to run the build task manually.
1. Run ```gulp sass:watch``` to run the scss file watcher task to compile the css files realtime.

The compiled css files will be generated in the ```assets``` directory. 

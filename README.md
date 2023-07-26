# AppointmentManagementSystem

Projenin kurulum adımları:

1.MongoDB Compass Kurulumu: 
https://www.mongodb.com/try/download/compass linkinden MongoDB yi kurduktan sonra Connection kısmındaki URL kısmına mongodb://localhost:27017 yazıp connect işlemini gerçekleştiriyoruz. 

Daha sonra AppointmentManagementSystemDb adında bir database oluşturuyoruz. 
Database e tıklayıp içine girdikten sonra appointmentcollections adında bir koleksiyon oluşturuyoruz ve ADD DATA kısmından import json kısmını seçiyoruz. 
Projede AppointmentManagementSystemDb klasörünün altındaki uygun json dosyasını seçip import ediyoruz.
Aynı işlemi auths adında bir koleksiyon oluşturup tekrarlıyoruz.

2.Node.js Kurulumu:
https://nodejs.org/tr/download/current adresinden uygun sürümü seçip indiriyoruz. Kurulumu doğrulamak için cmd'ye "node -v" yazıyoruz.
Gerekli modüllerin hepsi yüklenmiştir. terminal'e npm start yazıp projeyi çalıştırdıktan sonra tarayıcıya localhost:8000/home yazarak anasayfamıza erişim sağlayabilirsiniz.

/-------------------------------------------------------------English version-------------------------------------------------------------/

Installation steps of the project:

1.Installing MongoDB Compass: 
https://www.mongodb.com/try/download/compass after installing MongoDB from the link, we type mongodb://localhost:27017 into the URL section in the Connection section and perform the connect operation. 

Then we create a database called AppointmentManagementSystemDb. 
After clicking on the database and entering it, we create a collection called appointmentcollections and select the import json section from the ADD DATA section. 
In the project, we select the appropriate json file under the AppointmentManagementSystemDb folder and import it.
We create a collection called auths and repeat the same process.

2.Node.js Installation:
https://nodejs.org/tr/download/current we select the appropriate version from the address and download it. We type "node -v" into the cmd to verify the installation.
All the necessary modules have been installed. after typing npm start in the terminal and running the project, you can access our homepage by typing localhost:8000/home in the browser.
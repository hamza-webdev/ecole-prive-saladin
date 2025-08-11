
import { PrismaClient, UserRole, Gender } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Début du seeding...');

  // Nettoyer les données existantes (pour le développement)
  await prisma.studentClass.deleteMany();
  await prisma.student.deleteMany();
  await prisma.class.deleteMany();
  await prisma.session.deleteMany();
  await prisma.account.deleteMany();
  await prisma.user.deleteMany();

  // Hasher les mots de passe
  const adminPassword = await bcrypt.hash('admin123', 12);
  const professorPassword = await bcrypt.hash('prof123', 12);
  const testPassword = await bcrypt.hash('johndoe123', 12);

  // Créer les utilisateurs
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@ecole.com',
      password: adminPassword,
      firstName: 'Admin',
      lastName: 'École',
      role: UserRole.ADMIN,
    },
  });

  // Compte de test requis
  const testUser = await prisma.user.create({
    data: {
      email: 'john@doe.com',
      password: testPassword,
      firstName: 'John',
      lastName: 'Doe',
      role: UserRole.ADMIN,
    },
  });

  const prof1 = await prisma.user.create({
    data: {
      email: 'marie.dubois@ecole.com',
      password: professorPassword,
      firstName: 'Marie',
      lastName: 'Dubois',
      role: UserRole.TEACHER,
    },
  });

  const prof2 = await prisma.user.create({
    data: {
      email: 'jean.martin@ecole.com',
      password: professorPassword,
      firstName: 'Jean',
      lastName: 'Martin',
      role: UserRole.TEACHER,
    },
  });

  const prof3 = await prisma.user.create({
    data: {
      email: 'sophie.bernard@ecole.com',
      password: professorPassword,
      firstName: 'Sophie',
      lastName: 'Bernard',
      role: UserRole.TEACHER,
    },
  });

  console.log('✅ Utilisateurs créés');

  // Créer les classes
  const classes = await prisma.class.createMany({
    data: [
      {
        name: '6ème A',
        level: '6ème',
        section: 'A',
        schoolYear: '2024-2025',
        teacherId: prof1.id,
      },
      {
        name: '6ème B',
        level: '6ème',
        section: 'B',
        schoolYear: '2024-2025',
        teacherId: prof2.id,
      },
      {
        name: '5ème A',
        level: '5ème',
        section: 'A',
        schoolYear: '2024-2025',
        teacherId: prof3.id,
      },
      {
        name: '4ème A',
        level: '4ème',
        section: 'A',
        schoolYear: '2024-2025',
        teacherId: prof1.id,
      },
      {
        name: '3ème A',
        level: '3ème',
        section: 'A',
        schoolYear: '2024-2025',
        teacherId: prof2.id,
      },
    ],
  });

  // Récupérer les classes créées
  const classesCreated = await prisma.class.findMany();
  
  console.log('✅ Classes créées');

  // Créer des élèves
  const students = [
    {
      firstName: 'Pierre',
      lastName: 'Dupont',
      dateOfBirth: new Date('2011-03-15'),
      gender: Gender.MALE,
      address: '12 rue de la Paix',
      city: 'Paris',
      postalCode: '75001',
      parentName: 'Michel Dupont',
      parentPhone: '0123456789',
      parentEmail: 'michel.dupont@email.com',
    },
    {
      firstName: 'Marie',
      lastName: 'Legrand',
      dateOfBirth: new Date('2011-07-22'),
      gender: Gender.FEMALE,
      address: '5 avenue des Champs',
      city: 'Lyon',
      postalCode: '69000',
      parentName: 'Sylvie Legrand',
      parentPhone: '0123456790',
      parentEmail: 'sylvie.legrand@email.com',
    },
    {
      firstName: 'Thomas',
      lastName: 'Moreau',
      dateOfBirth: new Date('2010-12-08'),
      gender: Gender.MALE,
      address: '8 place de la République',
      city: 'Marseille',
      postalCode: '13000',
      parentName: 'Catherine Moreau',
      parentPhone: '0123456791',
      parentEmail: 'catherine.moreau@email.com',
    },
    {
      firstName: 'Emma',
      lastName: 'Petit',
      dateOfBirth: new Date('2011-01-30'),
      gender: Gender.FEMALE,
      address: '15 boulevard Saint-Germain',
      city: 'Paris',
      postalCode: '75005',
      parentName: 'Laurent Petit',
      parentPhone: '0123456792',
      parentEmail: 'laurent.petit@email.com',
    },
    {
      firstName: 'Lucas',
      lastName: 'Roux',
      dateOfBirth: new Date('2010-09-14'),
      gender: Gender.MALE,
      address: '3 rue du Commerce',
      city: 'Toulouse',
      postalCode: '31000',
      parentName: 'Nathalie Roux',
      parentPhone: '0123456793',
      parentEmail: 'nathalie.roux@email.com',
    },
    {
      firstName: 'Léa',
      lastName: 'Garcia',
      dateOfBirth: new Date('2009-05-18'),
      gender: Gender.FEMALE,
      address: '7 impasse des Lilas',
      city: 'Nice',
      postalCode: '06000',
      parentName: 'Carlos Garcia',
      parentPhone: '0123456794',
      parentEmail: 'carlos.garcia@email.com',
    },
    {
      firstName: 'Hugo',
      lastName: 'Blanc',
      dateOfBirth: new Date('2008-11-25'),
      gender: Gender.MALE,
      address: '21 rue de la Liberté',
      city: 'Strasbourg',
      postalCode: '67000',
      parentName: 'Isabelle Blanc',
      parentPhone: '0123456795',
      parentEmail: 'isabelle.blanc@email.com',
    },
    {
      firstName: 'Chloé',
      lastName: 'Simon',
      dateOfBirth: new Date('2007-04-12'),
      gender: Gender.FEMALE,
      address: '9 cours Mirabeau',
      city: 'Aix-en-Provence',
      postalCode: '13100',
      parentName: 'Philippe Simon',
      parentPhone: '0123456796',
      parentEmail: 'philippe.simon@email.com',
    },
  ];

  const createdStudents = [];
  for (const studentData of students) {
    const student = await prisma.student.create({
      data: studentData,
    });
    createdStudents.push(student);
  }

  console.log('✅ Élèves créés');

  // Affecter les élèves aux classes (selon leur âge approximatif)
  const assignments = [
    // 6ème A (élèves nés en 2011)
    { studentIndex: 0, className: '6ème A' }, // Pierre
    { studentIndex: 1, className: '6ème A' }, // Marie
    { studentIndex: 3, className: '6ème A' }, // Emma
    
    // 6ème B
    { studentIndex: 2, className: '6ème B' }, // Thomas
    
    // 5ème A (élèves nés en 2010)
    { studentIndex: 4, className: '5ème A' }, // Lucas
    
    // 4ème A (élèves nés en 2009)
    { studentIndex: 5, className: '4ème A' }, // Léa
    { studentIndex: 6, className: '4ème A' }, // Hugo
    
    // 3ème A (élèves nés en 2007-2008)
    { studentIndex: 7, className: '3ème A' }, // Chloé
  ];

  for (const assignment of assignments) {
    const targetClass = classesCreated.find(c => c.name === assignment.className);
    if (targetClass) {
      await prisma.studentClass.create({
        data: {
          studentId: createdStudents[assignment.studentIndex].id,
          classId: targetClass.id,
        },
      });
    }
  }

  console.log('✅ Affectations élèves-classes créées');

  console.log('\n🎉 Seeding terminé avec succès !');
  console.log('\n📊 Données créées :');
  console.log(`👥 Utilisateurs : ${await prisma.user.count()}`);
  console.log(`🎓 Élèves : ${await prisma.student.count()}`);
  console.log(`🏫 Classes : ${await prisma.class.count()}`);
  console.log(`🔗 Affectations : ${await prisma.studentClass.count()}`);
  
  console.log('\n🔐 Comptes de test :');
  console.log('Admin : admin@ecole.com / admin123');
  console.log('Professeur : marie.dubois@ecole.com / prof123');
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors du seeding :', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

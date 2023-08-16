<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\Admin;
use App\Repository\AdminRepository;

#[Route('/api')]
class AdminController extends AbstractController
{
    // get complete list of admin
    #[Route('/admin', methods: ['GET'])]
    public function index(ManagerRegistry $doctrine): Response
    {
        $em = $doctrine->getManager();
        $admin = $em->getRepository(Admin::class)->findAll();

        if (!$admin) {
            return $this->json("No admin found", 404);
        }

        return $this->json($admin, 200);
    }


    // create a new admin
    #[Route('/admin', methods: ['POST'])]
    public function new(ManagerRegistry $doctrine, Request $request, UserPasswordHasherInterface $passwordHasher): Response 
    {
        $em = $doctrine->getManager();
        $decoded = json_decode($request->getContent());

        $name = $decoded->name;
        $email = $decoded->email;
        $password = $decoded->password;

        $admin = new Admin();

        $hashedPassword = $passwordHasher->hashPassword(
            $user,
            $password
        );
        
        $admin->setName($name);
        $admin->setEmail($email);
        $admin->setPassword($hashedPassword);

        $em-> persist($admin);
        $em->flush();

        return $this->json('Created an admin successfully with id ' .$admin->getId(), 201);
    }


    // get a specific admin
    #[Route('/admin/{adminId}', methods: ['GET'])]
    public function show(ManagerRegistry $doctrine, int $adminId): Response 
    {
        $em = $doctrine->getManager();
        $admin = $em->getRepository(Admin::class)->find($adminId);

        if (!$admin) {
            return $this->json("No admin found for id " .$adminId, 404);
        }

        $data_admin = [
            'id'=>$admin->getId(),
            'name'=>$admin->getName(),
            'email'=>$admin->getEmail(),
            'password'=>$admin->getPassword(),
        ];

        return $this->json($data_admin, 200);
    }


    // update a specific admin
    #[Route('/admin/{adminId}', methods: ['PUT'])]
    public function edit(ManagerRegistry $doctrine, Request $request, int $adminId): Response
    {
        $em = $doctrine->getManager();
        $admin = $em->getRepository(Admin::class)->find($adminId);

        if (!$admin) {
            return $this->json("No admin found for id " .$adminId, 404);
        }

        $decoded = json_decode($request->getContent());
        $name = $decoded->name;
        $email = $decoded->email;
        $password = $decoded->password;

        $admin->setName($name);
        $admin->setEmail($email);
        $admin->setPassword($password);

        $em->flush();

        $data_admin = [
            'id'=>$admin->getId(),
            'name'=>$admin->getName(),
            'email'=>$admin->getEmail(),
            'password'=>$admin->getPassword(),
        ];

        return $this->json($data_admin, 201);
    }


    // delete a specific admin
    #[Route('/admin/{adminId}', methods: ['DELETE'])]
    public function delete(ManagerRegistry $doctrine, int $adminId): Response 
    {
        $em = $doctrine->getManager();
        $admin = $em->getRepository(Admin::class)->find($adminId);

        if (!$admin) {
            return $this->json("No admin found for id " .$adminId, 404);
        }

        $em->remove($admin);
        $em->flush();

        return $this->json("Deleted an admin successfully with id " .$adminId, 204);
    }
}

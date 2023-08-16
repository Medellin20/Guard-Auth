<?php

namespace App\Security;

use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
use Symfony\Component\Security\Core\Exception\CustomUserMessageAuthenticationException;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Security;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Http\Authenticator\AbstractLoginFormAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\CsrfTokenBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\RememberMeBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Credentials\PasswordCredentials;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Util\TargetPathTrait;

class AdminAuthenticator extends AbstractLoginFormAuthenticator
{
    use TargetPathTrait;

    public const LOGIN_ROUTE = 'app_login';

    public function __construct(private UrlGeneratorInterface $urlGenerator, Security $security)
    {
        $this->security = $security;
    }

    // Check if the request can be support by the method of authentitcation
    public function supports(Request $request) 
    {
        return $request->attributes->get('_route') === 'app_login' && $request->isMethod('POST');
    }

    public function getCredentials(Request $request) 
    {
        // get the informations of user in the request
        $credentials = [
            'name' => $request->request->get('name'),
            'password' => $request->request->get('password')
        ];

        return $credentials;
    }

    public function getUser($credentials, UserProviderInterface $userProvider) {
        $name = $credentials['name'];

        // get the name of user by userProvider
        $user = $userProvider->loadUserByIdentifier('name');

        if (!$user) {
            throw new CustomUserMessageAuthenticationException("Invalid name or password", 1);
            
        }

        return $user;
    }

    public function checkCredentials($credentials, UserInterface $user) {
        $password = $credentials['password'];

        // check the password of user
        if (!password_verify($password, $user->getPassword())) {
            throw new CustomUserMessageAuthenticationException("Invalid name or password", 1);

        }

        return true;
    }

    public function authenticate(Request $request): Passport
    {
        $credentials = $this->getCredentials($request);
        $user = $this->getUser($credentials, $this->userProvider);

        $this->checkCredentials($credentials, $user);

        $request->getSession()->set(Security::LAST_USERNAME, $name);

        $passport = new Passport(
            new UserBadge($user), 
            new PasswordCredentials($credentials['password']),
            [
                new CsrfTokenBadge('authenticate', $request->request->get('_csrf_token')),
                new RememberMeBadge(),
            ]
        );

        $passport->setAttribute('name', $credentials['name']);

        return $passport;
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        if ($targetPath = $this->getTargetPath($request->getSession(), $firewallName)) {
            return true;
        }

        // For example:
        // return new RedirectResponse($this->urlGenerator->generate('some_route'));
        throw new \Exception('TODO: provide a valid redirect inside '.__FILE__);
    }

    protected function getLoginUrl(Request $request): string
    {
        return $this->urlGenerator->generate(self::LOGIN_ROUTE);
    }
}

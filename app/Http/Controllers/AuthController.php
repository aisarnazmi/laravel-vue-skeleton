<?php
namespace App\Http\Controllers;

use App\Models\Branch;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Services\DataExportService;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;

    /**
    * @OA\Info(
    *      version="1.0.0",
    *      title="Todo Apps API Documentation",
    *      description="All API for Cura (Bewell). For any usage of locked API, please login and retrieve the access token and input them in authorization form at top left of this page. The access token will automatically recognize the user.<br><br>To gain access for locked API, please login and generate access token and assign the access token in Authorization form [Bearer <access_token>].",
    * )
    */
    /**
    * @OA\SecurityScheme(
    *     type="apiKey",
    *     in="header",
    *     securityScheme="api_key",
    *     name="Authorization"
    * )
    */

class AuthController extends Controller
{

    public function register(Request $request)
    {
        $v = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'password'  => 'required|min:3|confirmed',
        ]);
        if ($v->fails())
        {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 422);
        }
        $user = new User;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        return response()->json(['status' => 'Register Successfully'], 200);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        if ($token = $this->guard()->attempt($credentials)) {

            return response()->json([
                'status' => 'Login Successfully',
            ], 200)->header('Authorization', $token);
        }
        return response()->json(['error' => 'Invalid Email or Password. Please try again'], 401);
    }
    /**
    *
    * @OA\Post(
    *
    *  path="/api/auth/login",
    *  operationId="login",
    *  tags={"Auth"},
    *  summary="Login User",
    *  @OA\Parameter(
    *      name="email",
    *      description="Email",
    *      required=true,
    *      in="query",
    *      @OA\Schema(
    *          type="string",
    *          default="admin@test.com"
    *      )
    *  ),
    *  @OA\Parameter(
    *      name="password",
    *      description="Password",
    *      required=true,
    *      in="query",
    *      @OA\Schema(
    *          type="string",
    *          default="123456"
    *      )
    *  ),
    *  @OA\Response(
    *      response=200,
    *      description="200-Token Create Success <br>
                     401-Unauthenticated <br>",
    *      @OA\JsonContent(
    *      )
    *  ),
    *  @OA\Response(response=400, description="Bad request"),
    *  @OA\Response(response=404, description="Resource Not Found"),
    *  @OA\Response(response=500, description="Internal Server Error"),
    * )
    */
                     
    public function logout()
    {
        $this->guard()->logout();
        return response()->json([
            'status' => 'success',
            'msg' => 'Logged out Successfully.'
        ], 200);
    }
    /**
    *
    * @OA\Post(
    *
    *  path="/api/auth/logout",
    *  operationId="logout",
    *  tags={"Auth"},
    *  summary="Logout User",
    *  tags={"Auth"},
    *      security={
    *          {
    *              "api_key": {}
    *          }
    *      },
    *  @OA\Response(
    *      response=200,
    *      description="200-Logged out Successfully <br>
                     401-Unauthenticated <br>",
    *      @OA\JsonContent(
    *      )
    *  ),
    *  @OA\Response(response=400, description="Bad request"),
    *  @OA\Response(response=404, description="Resource Not Found"),
    *  @OA\Response(response=500, description="Internal Server Error"),
    * )
    */
    public function user(Request $request)
    {
        
        return response()->json([
            'status' => 'success',
            'data' => auth()->user()
        ]);
    }
    /**
    *
    * @OA\Get(
    *
    *  path="/api/auth/user",
    *  operationId="user",
    *  tags={"Auth"},
    *  summary="Get User",
    *  tags={"Auth"},
    *      security={
    *          {
    *              "api_key": {}
    *          }
    *      },
    *  @OA\Response(
    *      response=200,
    *      description="200-Success <br>
                     401-Unauthenticated <br>",
    *      @OA\JsonContent(
    *      )
    *  ),
    *  @OA\Response(response=400, description="Bad request"),
    *  @OA\Response(response=404, description="Resource Not Found"),
    *  @OA\Response(response=500, description="Internal Server Error"),
    * )
    */
    public function refresh(Request $request)
    {
        try {
            if($request->header('Authorization') != ""){
                if ($token = $this->guard()->refresh()) {
                    $result['message'] = 'Success';
                    return response()->json($result, Response::HTTP_OK)->header('Authorization', $token);
                }
            }
        }catch (TokenBlacklistedException $e) {
            return response()->json(['error' => 'token_expired'], Response::HTTP_UNAUTHORIZED);
        }catch (TokenExpiredException $e) {
            return response()->json(['error' => 'token_expired'], Response::HTTP_UNAUTHORIZED);
        }catch (TokenInvalidException $e) {
            return response()->json(['error' => 'token_invalid'], Response::HTTP_UNAUTHORIZED);
        }catch (JWTException $e) {
            return response()->json(['error' => 'token_absent'], Response::HTTP_UNAUTHORIZED);
        }
        return response()->json(['error' => 'token_absent'], Response::HTTP_UNAUTHORIZED);
    }
    
    private function guard()
    {
        return Auth::guard();
    }

}
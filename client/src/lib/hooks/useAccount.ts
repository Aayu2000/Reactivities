import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import type { LoginSchema } from "../schemas/loginSchema"
import agent from "../api/agent"
import { useNavigate } from "react-router";
import type { RegisterSchema } from "../schemas/registerSchema";
import { toast } from "react-toastify";

export const useAccount = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const loginUser = useMutation({
        mutationFn: async (creds: LoginSchema) => {
            await agent.post('/login?useCookies=true', creds)
        },
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['user']
            });
        }
    });


    const registerUser = useMutation({
        mutationFn: async (creds: RegisterSchema) => {
            await agent.post('/account/register', creds)
        },
        onSuccess: () => {
            toast.success('Registration Successful - you can now login')
            navigate('/login')
        }
    })

    const logoutUser = useMutation({
        mutationFn: async () => {
            await agent.post('/account/logout');
        },
        onSuccess: async () => {
            queryClient.removeQueries({ queryKey: ['user'] })
            queryClient.removeQueries({ queryKey: ['activities'] })
            // 1. Cancel any active background queries so they don't resolve 
            // after the user logs out and throw unexpected UI errors.
            await queryClient.cancelQueries();
            // 2. Clear your local auth tracking state/token store here if applicable
            // e.g., userStore.clearUser() or localStorage.removeItem('token');

            // 3. Wipes out ALL query cache instances, states, and metadata cleanly 
            // across the entire application in one atomic step.
            queryClient.clear();

            // 4. Redirect the client cleanly to the entry routing landing page
            navigate('/', { replace: true }); // 'replace: true' prevents hitting the 'Back' button to view cached pages
            
        }
    })

    const { data: currentUser, isLoading: loadingUserInfo } = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const response = await agent.get<User>('/account/user-info')
            return response.data
        },
        enabled: !queryClient.getQueryData(['user'])
    })


    return {
        loginUser,
        currentUser,
        logoutUser,
        loadingUserInfo,
        registerUser
    }
}
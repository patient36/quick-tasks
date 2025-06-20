import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { login, logout, getCurrentUser, register, resetPassword, getOTP, deleteAccount, updateUser } from '@/services/auth.services';

export const useAuth = () => {
    const queryClient = useQueryClient();

    const userQuery = useQuery({
        queryKey: ['auth', 'user'],
        queryFn: getCurrentUser,
        retry: true,
        refetchOnWindowFocus: true,
        staleTime: 1000 * 10,
    });

    const loginMutation = useMutation({
        mutationKey: ['auth', 'login'],
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
        },
    });

    const registerMutation = useMutation({
        mutationKey: ['auth', 'register'],
        mutationFn: register,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auth', 'user'] });
        }
    })

    const resetPasswordMutation = useMutation({
        mutationKey: ['auth', 'reset-password'],
        mutationFn: resetPassword
    })

    const getOTPMutation = useMutation({
        mutationKey: ['auth', 'forgot-password'],
        mutationFn: getOTP
    })

    const logoutMutation = useMutation({
        mutationKey: ['auth', 'logout'],
        mutationFn: logout,
        onSuccess: () => {
            queryClient.setQueryData(['auth', 'user'], null);
        },
    });

    const deleteAccountMutation = useMutation({
        mutationKey: ['auth', 'delete-account'],
        mutationFn: deleteAccount,
        onSuccess: () => {
            queryClient.removeQueries({
                predicate: (query) =>
                    query.queryKey[0] === 'auth',
            });

        }
    })

    const updateUserMutation = useMutation({
        mutationKey: ['auth', 'update-user'],
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => query.queryKey[0] === 'auth',
            });
        }
    })

    return {
        userData: userQuery.data,
        isLoading: userQuery.isLoading,
        isError: userQuery.isError,
        error: userQuery.error,
        isAuthenticated: !!userQuery.data,

        login: loginMutation.mutate,
        register: registerMutation.mutate,
        resetPassword: resetPasswordMutation.mutate,
        getOTP: getOTPMutation.mutate,
        logout: logoutMutation.mutate,
        deleteAccount: deleteAccountMutation.mutate,
        updateUser: updateUserMutation.mutate,
    };
};
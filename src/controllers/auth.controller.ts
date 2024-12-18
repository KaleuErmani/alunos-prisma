import { Request, Response } from "express";
import { repository } from "../database/prisma.connection";
import { randomUUID } from "crypto";
export class AuthController {
  public async login(request: Request, response: Response) {
    try {
      // entrada
      const { email, password } = request.body;

      if (!email || !password) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: 'Os campos "email" e "password" são obrigatórios.',
        });
      }

      const student = await repository.student.findFirst({
        where: {
          email,
          password,
        },
        select: {
          id: true,
          name: true,
          email: true,
          age: true,
        },
      });

      if (!student) {
        // 401 - Unauthorized
        return response.status(401).json({
          success: false,
          code: response.statusCode,
          message: "Credenciais inválidas.",
        });
      }

      const token = randomUUID();

      await repository.student.update({
        where: {
          id: student.id,
        },
        data: {
          token,
        },
      });

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Login realizado com sucesso.",
        data: {
          ...student,
          token,
        },
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao realizar login.",
      });
    }
  }
}

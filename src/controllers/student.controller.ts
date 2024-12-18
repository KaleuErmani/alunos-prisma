import { Request, Response } from "express";

import { repository } from "../database/prisma.connection";
import { Student } from "../models/student.model";

export class StudentController {
  // index -> lista todos os registros
  public async index(request: Request, response: Response) {
    try {
      // processamento
      const students = await repository.student.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          age: true,
        },
      });

      // saída
      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Alunos listados com sucesso.",
        data: students,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao listar alunos.",
      });
    }
  }

  // store -> criar um novo registro
  public async store(request: Request, response: Response) {
    try {
      // entrada
      const { name, email, password, age } = request.body;

      // processamento
      if (!name || !email || !password) {
        return response.status(400).json({
          success: false,
          code: response.statusCode,
          message: "Preencha todos os campos obrigatórios.",
        });
      }

      const newStudent = new Student(name, email, password, age);

      const createdStudent = await repository.student.create({
        data: {
          id: newStudent.id, //Se retirar essa linha, o banco gera automaticamente o ID
          name: newStudent.name,
          email: newStudent.email,
          password: newStudent.password,
          age: newStudent.age,
        },
        select: {
          id: true,
          name: true,
          email: true,
          age: true,
        },
      });

      // saída
      return response.status(201).json({
        success: true,
        code: response.statusCode,
        message: "Aluno cadastrado com sucesso.",
        data: createdStudent,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao cadastrar aluno.",
      });
    }
  }

  // show -> detalhes de um único registro
  public async show(request: Request, response: Response) {
    try {
      // entrada
      const { id } = request.params;

      //processamento
      const student = await repository.student.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          age: true,
        },
      });

      if (!student) {
        return response.status(404).json({
          success: false,
          code: response.statusCode,
          message: "Aluno não encontrado.",
        });
      }

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Aluno encontrado com sucesso.",
        data: student,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao encontrar aluno.",
      });
    }
  }

  // update -> atualizar um registro existente
  public async update(request: Request, response: Response) {
    try {
      // entrada
      const { id } = request.params;
      const { name, email, password, age } = request.body;

      // processamento
      const updatedStudent = await repository.student.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          password,
          age,
        },
        select: {
          name: true,
          email: true,
          age: true,
        },
      });

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Aluno atualizado com sucesso.",
        data: updatedStudent,
      });
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: "Erro ao atualizar aluno.",
      });
    }
  }

  // delete ou destroy -> remover um registro existente
  public async delete(request: Request, response: Response) {
    try {
      // entrada
      const { id } = request.params;

      // processamento
      const student = await repository.student.delete({
        where: {
          id,
        },
        select: {
          id: true,
          name: true,
          email: true,
          age: true,
        },
      });

      return response.status(200).json({
        success: true,
        code: response.statusCode,
        message: "Aluno removido com sucesso.",
        data: student,
      });

      // saída
    } catch (error) {
      return response.status(500).json({
        success: false,
        code: response.statusCode,
        message: `Erro ao tentar remover aluno. ${error}`,
      });
    }
  }
}
